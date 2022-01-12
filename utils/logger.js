//Dependencies
const chalk = require('chalk'),
moment = require('moment'),
log = require('simple-node-logger').createRollingFileLogger({
    logDirectory: './src/utils/logs',
    fileNamePatter: 'roll-<DATE>.log',
    dateFormat: 'YYYY.MM.DD',
});

// Logger
exports.log = (content, type = 'log') => {
    if (content == 'error') return;
    const timestamp = `[${moment().format('HH:mm:ss:SSS')}]:`;
    switch (type) {
        case 'log':
            log.info(content);
            console.log(`${timestamp} ${chalk.bgBlue(type.toUpperCase())} ${content} `);
            break;
        case 'warn':
            log.warn(content);
            console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content} `);
            break;
        case 'error':
            log.error(content);
            console.log(`${timestampt} ${chalk.bgRed(type.toUpperCase())} ${content}`);
            break;
        case 'cmd':
            log.debug(content);
            console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content}`);
            break;
        case 'cmd':
            log.info(content);
            console.log(`${timestamp} ${chalk.black.bgWhite(type.toUpperCase)} ${content}`);
            break;
        case 'ready':
            log.info(content);
            console.log(`${timestamp} ${chalk.black.bgGreeen(type.toUpperCase)} ${content}`);
            break;
        default:
            break;
    }
};

exports.warn = (...args) => this.log(...args, 'warn');

exports.error = (...args) => this.log(...args, 'error');

exports.debug = (...args) => this.log(...args, 'debug');

exports.cmd = (...args) => this.log(...args, 'cmd');

exports.ready = (...args) => this.log(...args, 'ready');