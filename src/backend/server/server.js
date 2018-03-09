import { asValue } from 'awilix';
import snmp from 'net-snmp';
import fs from 'fs';
import path from 'path';

const start = (container, logger) => {
  let snmpSettings = container.resolve('snmpSettings');
  return new Promise((resolve, reject) => {
    
    logger.info("SNMP service started.");
    resolve(snmpRunner(snmpSettings.origScanObjs, snmpSettings.snmpComms));
    
  });
};

const snmpRunner = (origScanObjs, snmpComms) => {

  let cdpScanned = {};

  var oid = "1.3.6.1.4.1.9.9.23.1.2.1";
  var columns = [4, 7, 6, 8];
  let promises = [];

  const pullCdpNeighbors = (scanObjs) => {
      for(let i=0; i<scanObjs.length; i++) {
          let sourceIp = scanObjs[i].ipAddr;
          let hostName = scanObjs[i].hostName;
          if(cdpScanned[hostName] === undefined) {
              cdpScanned[hostName] = {
                hostName: hostName,
                ipAddr: sourceIp,
                neighbors: []
            };

              for(let j=0; j<snmpComms.length; j++) {
                    let session = snmp.createSession (sourceIp, snmpComms[j], {retries:1, timeout:5000});

                    promises.push(new Promise((resolve, reject) => {
                        function responseCb (error, table) {
                            let discovered = {
                                hostName: hostName,
                                ipAddr: sourceIp,
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
                                        cdpDeviceId: table[inf][6].toString(),
                                        cdpPlatform: table[inf][8].toString(),
                                        cdpMgmtAddr: table[inf][7].toString()
                                    };
                                    discovered.neighbors.push(obj);
                                    pullCdpNeighbors([{hostName:obj.cdpDeviceId, ipAddr: cdpAddr}]);
                                }

                                cdpScanned[hostName] = discovered;
                                //pullCdpNeighbors
                                resolve();
                
                            }
                          
                      }
                      session.tableColumns (oid, columns, null, responseCb);
                  }));
              }
          } else {

          }
      }
  };
  pullCdpNeighbors(origScanObjs);

  Promise.all(promises).then(function() {
      console.log('all done');
      //console.log(cdpScanned);
      fs.writeFile(path.join(__dirname, '../cdpNeighborsPretty.json'), JSON.stringify(cdpScanned, null, 4));
      fs.writeFile(path.join(__dirname, '../cdpNeighbors.json'), JSON.stringify(cdpScanned));
  });

};

export {start};