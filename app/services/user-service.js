class UserService {
  constructor(logger, models, repositories) {
    this._logger = logger;
    let userModel = models.User;
    this._userRepository = new repositories.userRepository(userModel);
  }

  async findAllUsers() {
    try {
      this._logger.debug("Searching all users");
      return this._userRepository.findAll();
    } catch (e) {
      this._logger.error("Error on search all users", e);
      throw e;
    }
  }

  async findUserById(id) {
    try {
      this._logger.debug(`Searching a user by id ${id}`);
      return this._userRepository.findById(id);
    } catch (e) {
      this._logger.error(`Error on search a user by id ${id}`, e);
      throw e;
    }
  }
}

module.exports = UserService;
