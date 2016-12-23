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
      host: '114.215.238.125',
      port: '3306',
      database: 'mysql',
      user: 'root',
      password: '1234',
      prefix: '',
      encoding: 'utf8'
    }
  }
};