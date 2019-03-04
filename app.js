/** 
 * App
 * @description First page that runs when app starts.
 * Creates server on spcified port with defined routes (URIs)
 * @author Aswin Sasi
 * created on 2018/12/03
 */

/**
 * Require npm modules
 */
var cluster = require('cluster');
var cpuNum = require('os').cpus().length;
var http = require('http');
// ----------------------------------------------------------------------------

/**
 * Require external files
 */
var config = require('./app/config/server');
var router = require('./app/routes/routes');
var logger = require('./middlewares/logger');
// ----------------------------------------------------------------------------

/**
 * Variable declaration
 */
var port;
var server;
// ----------------------------------------------------------------------------

/**
 * Checking for port number in the configuration
 */
if (!config.serverConfig.portNumber) {
    logger.errorLogger('Please define port number in server.js');
} else {
    port = config.serverConfig.portNumber;
}
// ----------------------------------------------------------------------------

/**
 * Create server:
 * Devide work for different cpu threads and create server instance
 */
if (cluster.isMaster) {
    // fork workers
    logger.infoLogger('Number of fork workers: ' + cpuNum);
    // console.info('Number of fork workers: ' + cpuNum)

    for (let i = 0; i < cpuNum; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        logger.errorLogger('worker ' + worker.process.pid + ' died');
        // console.info('worker ' + worker.process.pid + ' died');
    });
} else {
    var app = router.getRouter();

    // if ssl enabled
    if (config.serverConfig.ssl.enabled) {
        var serverOptions = {
            key: fs.readFileSync(config.ssl.key),
            cert: fs.readFileSync(config.ssl.cert),
            ca: [fs.readFileSync(config.ssl.ca)]
        };

        server = http.createServer(serverOptions, app);
    } else {
        server = http.createServer(app);
    }

    server.listen(port);
    console.info('Server started on port ' + port + ' at ' + new Date());
}
// ----------------------------------------------------------------------------