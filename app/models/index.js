

require("babel-register");
const fp = require("fastify-plugin");

const config = Promise.resolve(require("./sequelize-instance")());

const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const db = {};

module.exports = fp( async(fastify, opts) => {

  const logger = fastify.logger();

  config.then((dbConfig) => {

    //Init models
    fs.readdirSync(__dirname)
        .filter((file) => {
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

    // Associate relationships
    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });

    // Sync database
    dbConfig.instance.sync({ alter: true });

    // Validate connection
    dbConfig.instance
        .authenticate()
        .then((result) => {
          logger.info("database client start with success", { msg: result });
        })
        .catch((err) => {
          logger.error("error on authenticate database user", { error: err });
        });

    // Registry of models and sequelize instance on Fastify
    fastify.decorate("models", () => db);
    fastify.decorate("sequelizeInstance", () => dbConfig.instance);
  });
});
