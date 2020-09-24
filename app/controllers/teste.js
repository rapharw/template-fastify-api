const fastifyPlugin = require("fastify-plugin");

async function doIt(fastify, options) {
  fastify.decorate("opa", () => {
    console.log("OPAAA");
  });
}

// Wrapping a plugin function with fastify-plugin exposes the decorators
// and hooks, declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(doIt);
