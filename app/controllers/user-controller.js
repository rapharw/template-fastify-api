const path = require("path");
const UserService = require(path.resolve("app/services/user-service"));

const findAll = async (request, reply) => {
  try{
    const userServiceInstance = new UserService();
    return userServiceInstance.findAll();
  }
  catch (e) {
    console.log(e);
    throw e;
  }
};

const findOne = async (request, reply) => {
  return { hello: `World ${request.params.userId}` };
};

module.exports = {
  findAll,
  findOne,
};
