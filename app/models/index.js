"use strict";

require("babel-register");

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);

const config = Promise.resolve(
  require(path.resolve("app/config/database/db-config"))()
);

const db = {};

config.then((dbConfig) => {
  let sequelize = new Sequelize(
    dbConfig.databaseName,
    dbConfig.user,
    dbConfig.password,
    {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      dialectOptions: {
        options: {
          requestTimeout: Number(dbConfig.requestTimeout),
          encrypt: Boolean(dbConfig.encrypt),
        },
        pool: {
          max: dbConfig.poolMaxConnection,
          min: dbConfig.poolMinConnection,
          idle: dbConfig.poolIdle,
        },
      },
      logging: false,
    }
  );

  fs.readdirSync(__dirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
      );
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, file))(
        sequelize,
        Sequelize.DataTypes
      );
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  sequelize.sync({ alter: true });

  sequelize
    .authenticate()
    .then((result) => {
      console.log("database client start with success", { msg: result });
    })
    .catch((err) => {
      console.log("error on authenticate database user", { error: err });
    });

  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
});

module.exports = async () => db;
