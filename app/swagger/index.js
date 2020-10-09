const fp = require("fastify-plugin");
const path = require("path");
const fs = require("fs");

module.exports = fp(async (fastify, options) => {
  fastify.register(require("fastify-swagger"), {
    routePrefix: "/documentation",
    mode: "static",
    specification: {
      path: path.resolve("app/swagger/openapi.yaml"),
    },
    exposeRoute: true,

    // ### dynamic mode ###
    // host: "localhost",
    // schemes: ["http"],
    // consumes: ["application/json"],
    // produces: ["application/json"],
    // exposeRoute: true,
  });

  fastify.ready(async () => {
    fastify.swagger();
  });
});
