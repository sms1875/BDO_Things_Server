const sql = require('mssql');
const { config } = require('../config/config');

/**
 * 데이터베이스 연결 풀을 생성하고, 연결을 시도합니다.
 */
const connPool = new sql.ConnectionPool(config.dbconfig)
  .connect()
  .then((pool) => {
    console.log('DB 연결 성공');
    return pool;
  })
  .catch((err) => {
    console.log('DB 연결 실패', err);
  });

module.exports = { sql, connPool };