require("babel-register");
const path = require("path");

const fastify = require("fastify")({
  logger: true,
});

// load models
fastify.register(require(path.resolve("app/models/index")));

// load routes
fastify.register(require(path.resolve("app/routes/hello-world-route")));

module.exports = async () => await fastify.listen(3000);
