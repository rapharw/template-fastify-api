require("babel-register");
const path = require("path");

const fastify = require("fastify")({
  logger: true,
});

// // load error handler
fastify.register(require(path.resolve("app/config/handler/error-handler")));

// load models
fastify.register(require(path.resolve("app/models/index")));

// load routes
fastify.register(require(path.resolve("app/routes/index")));

module.exports = async () => await fastify.listen(process.env.PORT || 3000);
