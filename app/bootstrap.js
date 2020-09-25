const path = require("path");
const AutoLoad = require("fastify-autoload");

module.exports = async function (fastify, opts) {
  // load models
  fastify.register(require(path.resolve("app/models/index")));

  // load plugins
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  // load repositories
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "repositories"),
    options: Object.assign({}, opts),
    ignorePattern: /.*(-template|-repository).js/,
  });

  // load services
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "services"),
    options: Object.assign({}, opts),
    ignorePattern: /.*(-template|-service).js/,
  });

  // load routes
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
};
