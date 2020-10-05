const BusinessError = require("./business-error");

class UserNotUpdatedError extends BusinessError {
  constructor() {
    super("Error on update User");
  }
}

module.exports = UserNotUpdatedError;
