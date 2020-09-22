const path = require("path");
const UserService = require(path.resolve("app/services/user-service"));

async function controllers(fastify, opts) {

  const findAll = async (request, reply) => {
    return new UserService().findAll();
  };

  const findOne = async (request, reply) => {
    return { hello: `World ${request.params.userId}` };
  };
}

module.exports = controllers;
