require("babel-register");
const path = require("path");

const fastify = require("fastify")({
  logger: true,
});

// // load error handler
fastify.register(require(path.resolve("app/config/handler/error-handler")));

// load models
const sequelize = require(path.resolve("app/models/index"));
fastify.register(sequelize);
fastify.decorate('dbSequelize', sequelize);

// load routes
fastify.register(require(path.resolve("app/routes/index")));

module.exports = async () => fastify.listen(process.env.PORT || 3000);
