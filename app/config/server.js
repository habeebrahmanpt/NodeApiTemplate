/**
 * @file server
 * @description Configuration variables related to server
 * @author Habeeb
 * created on 2018/12/03
 */

const SERVER_CONFIG = {
    portNumber: 5005,
    debugMode: true,
    ssl: {
        enabled: false
    },
    authSecret: 'SECRETO_PARA_ENCRYPTACTION',
    cryptAlgorithm: 'aes-256-ctr',
    cryptPassword: 'd6F3Efeq',
    baseUrl: 'http://aswinsasi.amtpl.in:5001'
}

exports.serverConfig = SERVER_CONFIG;
// ----------------------------------------------------------------------------

