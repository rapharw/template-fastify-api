const RepositoryTemplate = require("./repository-template");
const path = require("path");
const User = require(path.resolve("app/models/user"));

class UserRepository extends RepositoryTemplate {
  constructor() {
    super(User);
    console.log("repository - UserRepository - constructor");
  }
}

module.exports = UserRepository;
