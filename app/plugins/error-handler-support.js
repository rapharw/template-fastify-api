const fp = require("fastify-plugin");
const path = require("path");

const BusinessError = require(path.resolve("app/errors/business-error"));

module.exports = fp(async (fastify, options) => {
  fastify.setErrorHandler(function (error, request, reply) {
    let statusCode = 0;
    let response;

    const { validation, validationContext } = error;

    // check if we have a validation error
    if (validation) {
      statusCode = 400;

      let errorsMessage = [];
      validation.forEach((element) => {
        errorsMessage.push(element.message);
      });

      response = {
        // validationContext will be 'body' or 'params' or 'headers' or 'query'
        message: `A validation error occurred when validating the ${validationContext}...`,
        // this is the result of your validation library...
        errors: errorsMessage,
      };
    } else if (error instanceof BusinessError) {
      statusCode = 500;
      response = {
        message: error.message,
      };
    } else {
      statusCode = 500;
      response = {
        message: "Internal Server error",
      };
    }

    reply.status(statusCode).send(response);
  });
});
