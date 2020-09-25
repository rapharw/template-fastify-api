"use strict";

require("babel-register");
const fp = require("fastify-plugin");

const config = Promise.resolve(require("./sequelize-instance")());

const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const db = {};

async function loadModels(fastify, opts) {
  config.then((dbConfig) => {
    fs.readdirSync(__dirname)
      .filter((file) => {
        console.log(file);
        return (
          file.indexOf(".") !== 0 &&
          file !== basename &&
          file.slice(-3) === ".js" &&
          file !== "index.js" &&
          file !== "sequelize-instance.js"
        );
      })
      .forEach((file) => {
        const model = require(path.join(__dirname, file))(
          dbConfig.instance,
          dbConfig.dataType
        );
        db[model.name] = model;
      });

    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    dbConfig.instance.sync({ alter: true });

    dbConfig.instance
      .authenticate()
      .then((result) => {
        console.log("database client start with success", { msg: result });
      })
      .catch((err) => {
        console.log("error on authenticate database user", { error: err });
      });

    // db.sequelize = sequelize;
    // db.Sequelize = Sequelize;

    fastify.decorate("db", db);
  });
}

module.exports = fp(loadModels);
