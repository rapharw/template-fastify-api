const BusinessError = require("./business-error");

class UserNotDeletedError extends BusinessError {
  constructor() {
    super("Error on delete User");
  }
}

module.exports = UserNotDeletedError;
