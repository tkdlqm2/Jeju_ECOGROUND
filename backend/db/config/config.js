require('dotenv').config();
  
module.exports =  {
  "development": {
    "username": process.env.DB_DEV_USER_NAME,
    "password": process.env.DB_DEV_USER_PW,
    "database": process.env.DB_DEV_USER_DB,
    "host"    : process.env.DB_DEV_USER_HOST,
    "dialect": "mysql",
    "dialectModule": require('mysql2'),
    "operatorsAliases": false
  },
  "test": {
    "username": process.env.DB_TEST_USER_NAME,
    "password": process.env.DB_TEST_USER_PW,
    "database": process.env.DB_TEST_USER_DB,
    "host"    : process.env.DB_TEST_USER_HOST,
    "dialect": "mysql",
    "dialectModule": require('mysql2'),
    "operatorsAliases": false
  },
  "production": {
    "username": process.env.DB_PROD_USER_NAME,
    "password": process.env.DB_PROD_USER_PW,
    "database": process.env.DB_PROD_USER_DB,
    "host"    : process.env.DB_PROD_USER_HOST,
    "dialect": "mysql",
    "dialectModule": require('mysql2'),
    "operatorsAliases": false
  }
}
