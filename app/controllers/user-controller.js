const path = require("path");
const UserService = require(path.resolve("app/services/user-service"));

const findAll = async (request, reply) => {
  console.log("controller - user-controller - findAll");
  const userServiceInstance = new UserService();
  return userServiceInstance.findAll();
};

const findOne = async (request, reply) => {
  return { hello: `World ${request.params.userId}` };
};

module.exports = {
  findAll,
  findOne,
};
