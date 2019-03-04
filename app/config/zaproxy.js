const ZapClient = require('zaproxy');
 
const zapOptions = {
//   apiKey: <the key you supplied to ZAP when you started it>, // I.E. 'v90dnblpqs1pcac991tn2oudl'
//   proxy: <protocol>://<host>:<port> // I.E. 'http://192.168.0.10:8080'
apiKey: v90dnblpqs1pcac991tn2oudl,
proxy: 'http://192.168.0.10:8080' // I.E. 'http://192.168.0.10:8080'
};
 
exports.zaproxy = new ZapClient(zapOptions);