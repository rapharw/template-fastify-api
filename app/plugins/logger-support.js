/**
 *  Returns a Pino Instance (default logger of Fastify)
 */

const fp = require("fastify-plugin");

module.exports = fp(async (fastify, opts) => {
  fastify.decorate("logger", function () {
    return fastify.log;
  });
});
