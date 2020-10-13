/**
 *  Returns a Pino Instance (default logger of Fastify)
 */

const fp = require("fastify-plugin");

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async (fastify, opts) => {
  fastify.decorate("logger", function () {
    return fastify.log;
  });
});
