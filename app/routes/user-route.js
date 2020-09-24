async function routes(fastify, options) {
  fastify.get("/", async () => {
    return 1;
  });
  fastify.get("/:userId", async () => {
    return 2;
  });
}

module.exports = routes;
