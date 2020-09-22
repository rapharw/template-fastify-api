const path = require("path");

async function routes(fastify, options) {

  console.log(fastify);

  // const userController = require(path.resolve(
  //   "app/controllers/user-controller"
  // ));

  // fastify.get("/", userController.findAll);
  // fastify.get("/:userId", userController.findOne);
}

module.exports = routes;
