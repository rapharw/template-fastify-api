const fp = require("fastify-plugin");
const path = require("path");

const BusinessError = require(path.resolve("app/error/business-error"));

module.exports = fp(async (fastify, options) => {
  fastify.setErrorHandler(function (error, request, reply) {
    const logger = fastify.logger();

    // Log error
    logger.error(error);

    let msg =
      error instanceof BusinessError ? error.message : "Internal Server Error";

    // Send error response
    reply.status(500).send({ error: msg });
  });
});
