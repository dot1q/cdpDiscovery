import { asValue } from 'awilix';
import snmp from 'net-snmp';
import fs from 'fs';
import path from 'path';
import { hostname } from 'os';

const start = (container, logger) => {
  let snmpSettings = container.resolve('snmpSettings');
  return new Promise((resolve, reject) => {
    
    logger.info("SNMP service started.");
    resolve(snmpRunner(snmpSettings.origScanObjs, snmpSettings.snmpComms));
    
  });
};

const snmpRunner = (origScanObjs, snmpComms) => { 

  let recursiveAll = a => Promise.all(a).then(r => r.length == a.length ? r : recursiveAll(a));
  let neighbor_promises = [];
  let cdpScanned = {};
  var cdp_oid = "1.3.6.1.4.1.9.9.23.1.2.1";
  var columns = [4, 5, 6, 7, 8];

  var hostname_oid=["1.3.6.1.2.1.1.5.0", "1.3.6.1.4.1.9.3.6.5.0"];
  let hostname_promises = [];

  const pullOrigHostnames = (origScanObjs) => {
    for(let i=0; i<origScanObjs.length; i++) {
      for(let j=0; j<snmpComms.length; j++) {
        let session = snmp.createSession (origScanObjs[i].ipAddr, snmpComms[j], {retries:1, timeout:5000});
  
        hostname_promises.push(new Promise((resolve, reject) => {
          session.get(hostname_oid, (error, varbinds) => {
            if (error) {
              // handle error here
              console.log(error);
              resolve();
            } else {
              if(varbinds.length > 0){
                origScanObjs[i].hostName = varbinds[0].value.toString();
                origScanObjs[i].swVersion = varbinds[1].value.toString();
                
                resolve();
              }
              
            }
          });
        }));
      }
    }
  }
  
  const pullCdpNeighbors = (scanObjs) => {
    for(let i=0; i<scanObjs.length; i++) {
      let sourceIp = scanObjs[i].ipAddr;
      let hostName = scanObjs[i].hostName;
      let swVersion = scanObjs[i].swVersion;
      // Scan for host cdp information only if it does not exist
      if(cdpScanned[hostName] === undefined) {
        cdpScanned[hostName] = {
          hostName: hostName,
          ipAddr: sourceIp,
          neighbors: []
        };

        for(let j=0; j<snmpComms.length; j++) {
          let session = snmp.createSession (sourceIp, snmpComms[j], {retries:1, timeout:5000});

          neighbor_promises.push(new Promise((resolve, reject) => {
            function responseCb (error, table) {
              let discovered = {
                hostName: hostName,
                ipAddr: sourceIp,
                swVersion: swVersion,
                neighbors: []
              };
              
              if (error) {
                //console.error (error.toString ());
                resolve();
              } else {
                for(let inf in table) {
                  let cdpAddr = (JSON.parse(JSON.stringify(table[inf][4]))).data.join('.');
                  let obj = {
                      cdpAddress: cdpAddr,
                      cdpSwVersion: table[inf][5].toString(),
                      cdpDeviceId: table[inf][6].toString(),
                      cdpPlatform: table[inf][8].toString(),
                      cdpMgmtAddr: table[inf][7].toString()
                  };
                  discovered.neighbors.push(obj);
                  pullCdpNeighbors([{hostName:obj.cdpDeviceId, ipAddr: cdpAddr, swVersion: obj.cdpSwVersion}]);
                }

                cdpScanned[hostName] = discovered;
                resolve();
              }
                
            }
            session.tableColumns (cdp_oid, columns, null, responseCb);
          }));
        }
      } else {

      }
    }
  };

  pullOrigHostnames(origScanObjs);
  
  Promise.all(hostname_promises).then(() => {
    console.log('done pulling hostnames');
    pullCdpNeighbors(origScanObjs);

    (async function run() {
      let results = await recursiveAll(neighbor_promises);
      console.log('all done');
      fs.writeFile(path.join(__dirname, '../cdpNeighborsPretty.json'), JSON.stringify(cdpScanned, null, 4));
      fs.writeFile(path.join(__dirname, '../cdpNeighbors.json'), JSON.stringify(cdpScanned));
    })();

    // Promise.all(neighbor_promises).then(() => {
        
    //     //console.log(cdpScanned);

    // }).catch((err) => {
    //   console.log(err);
    // });
  });
};

export {start};