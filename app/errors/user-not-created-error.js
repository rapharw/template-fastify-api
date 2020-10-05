const BusinessError = require("./business-error");

class UserNotCreatedError extends BusinessError {
  constructor() {
    super("Error on create User");
  }
}

module.exports = UserNotCreatedError;
