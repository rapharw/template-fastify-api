const errorHandler = async (fastify, options) => {
  fastify.setErrorHandler(function (error, request, reply) {
    reply
      .code(500)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({ message: "Internal Server Error" });
  });
};
module.exports = errorHandler;
