const BusinessError = require("./business-error");

class ListUsersNotFoundError extends BusinessError {
  constructor() {
    super("Error on list users. Users not found");
  }
}

module.exports = ListUsersNotFoundError;
