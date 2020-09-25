const RepositoryTemplate = require("./repository-template");

class UserRepository extends RepositoryTemplate {
  constructor(model) {
    super(model);
  }
}

module.exports = UserRepository;
