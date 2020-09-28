const path = require("path");
const AutoLoad = require("fastify-autoload");

module.exports = async function (fastify, opts) {
  // load plugins
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
    ignorePattern: /.*(schema|schema-parameters|schema-parameters-schema|schema-response).js/,
  });

  // load models (model ORM layer)
  fastify.register(require(path.resolve("app/models/index")));

  // load repositories (database layer)
  fastify.register(require(path.resolve("app/repositories/index")));

  // load services (business layer)
  fastify.register(require(path.resolve("app/services/index")));

  // load swagger
  fastify.register(require("fastify-swagger"), {
    routePrefix: "/documentation",
    swagger: {
      info: {
        title: "Test swagger",
        description: "testing the fastify swagger api",
        version: "1.0.0",
      },
      securityDefinitions: {
        apiKey: {
          type: "apiKey",
          name: "apiKey",
          in: "header",
        },
      },
      host: "localhost:3000",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
    exposeRoute: true,
  });

  // load routes recursive (routes & handler layer). wich folder will have your own route. ex: "user" folder will have a "/user" route
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });

  fastify.ready(async () => {
    fastify.swagger();
  });
};
