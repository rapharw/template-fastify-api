"use strict";

const opts = {
  host: process.env.DATABASE_HOST,
  databaseName: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  poolMaxConnection: process.env.DATABASE_POOL_MAX_CONNECTION,
  poolMinConnection: process.env.DATABASE_POOL_MIN_CONNECTION,
  poolIdle: process.env.DATABASE_POOL_IDLE,
  poolAcquire: process.env.DATABASE_ACQUIRE,
  dialect: process.env.DATABASE_DIALECT,
  requestTimeout: process.env.DATABASE_REQUEST_TIMEOUT,
  encrypt: process.env.DATABASE_ENCRYPT,
};

module.exports = async () => opts;
