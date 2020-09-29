class UserService {
  constructor(logger, models, repositories) {
    this._logger = logger;
    let userModel = models.User;
    this._userRepository = new repositories.userRepository(userModel);
  }

  async findAllUsers(filter) {
    try {
      this._logger.debug("Searching all users");
      return this._userRepository.findAll(filter);
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

  async deleteUserById(id) {
    try {
      this._logger.debug(`Deleting an user ${id}`);
      return this._userRepository.remove(id);
    } catch (e) {
      let msg = `Error on delete an user ${id}`;
      this._logger.error(msg + ` | ${e}`);
      throw e;
    }
  }

  async updateUserById(id, data) {
    try {
      this._logger.debug(`Updating an user by id ${id} | ${data}`);
      if (this.findUserById(id)) return this._userRepository.update(id, data);
    } catch (e) {
      let msg = `Error on delete an user ${id}`;
      this._logger.error(msg + ` | ${e}`);
      throw e;
    }
  }

  async createUserExcludingOld(id, data, entitySequelize) {
    try {
      this._logger.debug(`Creating an user and excluding old ${id} | ${data}`);
      if (this.findUserById(id)) {
        return entitySequelize.transaction((tx) => {
          data.id = id;
          return Promise.all([this.deleteUserById(id), this.createAUser(data)]);
        });
      }
    } catch (e) {
      let msg = `Error on delete an user ${id}`;
      this._logger.error(msg + ` | ${e}`);
      throw e;
    }
  }
}

module.exports = UserService;
