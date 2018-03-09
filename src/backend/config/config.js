const snmpSettings = {
  origScanObjs: [{
      ipAddr: '10.10.10.10',
      hostName: 'CISCO-SW4'
  }],
  snmpComms: ['public']
};


const logSettings = {
  writeToFile: false || process.env.WRITETOFILE
};


export {snmpSettings, logSettings};
