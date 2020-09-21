const RepositoryTemplate = require("./repository-template");
const path = require("path");
const db = require(path.resolve("app/models"))();

class UserRepository extends RepositoryTemplate {
  constructor() {
    super(db.sequelize.models.User);
    console.log("repository - UserRepository - constructor");
  }
}

module.exports = UserRepository;
