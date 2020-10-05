class UserService {
  constructor(logger, models, repositories, businessErrors) {
    this._logger = logger;

    let userModel = models.User;
    this._userRepository = new repositories.UserRepository(userModel);
    console.log(businessErrors);
    this._businessErrors = businessErrors;
  }

  async findAllUsers(filter) {
    try {
      this._logger.debug("Searching all users");
      throw new Error("Ops! Error.");
      return this._userRepository.findAll(filter);
    } catch (e) {
      let error = new this._businessErrors.ListUsersNotFoundError();
      this._logger.error(error.message + ` | ${e}`);

      throw error;
    }
  }

  async findUserById(id) {
    try {
      this._logger.debug(`Searching an user by id ${id}`);
      throw new Error("Ops! Error.");
      return this._userRepository.findById(id);
    } catch (e) {
      let error = new this._businessErrors.UserNotFoundError();
      this._logger.error(error.message + ` | ${e}`);

      throw error;
    }
  }

  async createAUser(data) {
    try {
      this._logger.debug(`Creating an user ${data}`);
      throw new Error("Ops! Error.");
      return this._userRepository.save(data);
    } catch (e) {
      let error = new this._businessErrors.UserNotCreatedError();
      this._logger.error(error.message + ` | ${e}`);

      throw error;
    }
  }

  async deleteUserById(id) {
    try {
      this._logger.debug(`Deleting an user ${id}`);
      throw new Error("Ops! Error.");
      return this._userRepository.remove(id);
    } catch (e) {
      let error = new this._businessErrors.UserNotDeletedError();
      this._logger.error(error.message + ` | ${e}`);

      throw error;
    }
  }

  async updateUserById(id, data) {
    try {
      this._logger.debug(`Updating an user by id ${id} | ${data}`);
      throw new Error("Ops! Error.");
      if (this.findUserById(id)) return this._userRepository.update(id, data);
    } catch (e) {
      let error = new this._businessErrors.UserNotUpdatedError();
      this._logger.error(error.message + ` | ${e}`);

      throw error;
    }
  }

  async createUserExcludingOld(id, data, entitySequelize) {
    try {
      this._logger.debug(`Creating an user and excluding old ${id} | ${data}`);
      throw new Error("Ops! Error.");
      if (this.findUserById(id)) {
        return entitySequelize.transaction((tx) => {
          data.id = id;
          return Promise.all([this.deleteUserById(id), this.createAUser(data)]);
        });
      }
    } catch (e) {
      let error = new this._businessErrors.UserGenericError();
      this._logger.error(error.message + ` | ${e}`);

      throw error;
    }
  }
}

module.exports = UserService;
