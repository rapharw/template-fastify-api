"use strict";
const Sequelize = require("sequelize");

// transaction
const cls = require("cls-hooked");
const namespace = cls.createNamespace("cls-transaction-sequelize");

async function sequelizeInstance() {
  Sequelize.useCLS(namespace);

  const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      host: process.env.DATABASE_HOST,
      dialect: process.env.DATABASE_DIALECT,
      dialectOptions: {
        options: {
          requestTimeout: Number(process.env.DATABASE_REQUEST_TIMEOUT),
          encrypt: Boolean(process.env.DATABASE_ENCRYPT),
        },
        pool: {
          max: process.env.DATABASE_POOL_MAX_CONNECTION,
          min: process.env.DATABASE_POOL_MIN_CONNECTION,
          idle: process.env.DATABASE_POOL_IDLE,
        },
      },
      logging: false,
    }
  );

  return {
    class: Sequelize,
    instance: sequelize,
    dataType: Sequelize.DataTypes,
  };
}

module.exports = sequelizeInstance;
