class BusinessError extends Error {
  constructor(msg) {
    super(msg);
  }
}

module.exports = BusinessError;
