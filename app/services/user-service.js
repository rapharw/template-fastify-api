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
      let msg = `Error on search all users`;
      this._logger.error(msg + ` | ${e}`);
      throw new Error(msg);
    }
  }

  async findUserById(id) {
    try {
      this._logger.debug(`Searching an user by id ${id}`);
      return this._userRepository.findById(id);
    } catch (e) {
      let msg = `Error on search an user by id ${id}`;
      this._logger.error(msg + ` | ${e}`);
      throw e;
    }
  }

  async createAUser(data) {
    try {
      this._logger.debug(`Creating an user ${data}`);
      return this._userRepository.save(data);
    } catch (e) {
      let msg = `Error on create an user ${data}`;
      this._logger.error(msg + ` | ${e}`);
      throw e;
    }
  }
}

module.exports = UserService;
