let log4js = require('log4js');

log4js.configure({
    appenders: {
        out: {
            type: 'console'
        },
        app: {
            type: 'file',
            filename: 'log/app.log'
        }
    },
    categories: {
        default: {
            appenders: [ 'out', 'app' ],
            level: 'debug'
        }
    }
});

let logger = log4js.getLogger('app');

module.exports = logger;