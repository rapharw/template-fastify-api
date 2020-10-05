const BusinessError = require("./business-error");

class UserNotFoundError extends BusinessError {
  constructor() {
    super("Error on find User. User not found");
  }
}

module.exports = UserNotFoundError;
