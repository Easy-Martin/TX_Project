'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
    type: 'mysql',
    log_sql: true,
    log_connect: true,
    adapter: {
        mysql: {
            host: '116.62.40.105',
            port: '3306',
            database: 'tx',
            user: 'root',
            password: '1234',
            prefix: '',
            encoding: 'utf8'
        }
    }
};