const BusinessError = require("./business-error");

class UserGenericError extends BusinessError {
  constructor() {
    super("Operation with User has failed.");
  }
}

module.exports = UserGenericError;
