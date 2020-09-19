async function routes(fastify, options) {
  const path = require("path");

  const userController = require(path.resolve(
    "app/controllers/user-controller"
  ));

  fastify.get("/", userController.findAll);
  fastify.get("/:userId", userController.findOne);
}

module.exports = routes;
