const ServiceTemplate = require("./service-template");
const path = require("path");
const UserRepository = require(path.resolve(
  "app/repositories/user-repository"
));

class UserService extends ServiceTemplate {
  constructor() {
    super(new UserRepository());
    console.log("service - UserService - constructor");
  }

  async findAll() {
    try {
      console.log(
        "******************* findAll do meu userSERVICE *******************"
      );
      return await super.findAll();
    } catch (err) {
      console.log("error findddddAll " + err);
      throw new Error("Error on findAll Users");
    }
  }
}

module.exports = UserService;
