const RepositoryTemplate = require("./repository-template");
const path = require("path");
const db = require(path.resolve("app/models/"))();

class UserRepository extends RepositoryTemplate {
  constructor() {
    super(db.sequelize.models.User);
  }
}

module.exports = UserRepository;
