async function routes(fastify, options) {
  fastify.get("/", async (request, reply) => {
    return { hello: "world" };
  });

  fastify.get("/:userId", async (request, reply) => {
    return { hello: `World ${request.params.userId}` };
  });
}

module.exports = routes;
