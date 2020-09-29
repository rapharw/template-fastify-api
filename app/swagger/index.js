const fp = require("fastify-plugin");
const path = require("path");
const fs = require("fs");

module.exports = fp(async (fastify, options) => {
  fastify.register(require("fastify-swagger"), {
    routePrefix: "/documentation",
    mode: "static",
    specification: {
      path: path.resolve("app/swagger/api-spec.yaml"),
    },
    exposeRoute: true,
  });

  fastify.ready(async () => {
    fastify.swagger();
  });
});
