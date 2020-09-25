class UserService {
  constructor(db, repositories) {
    let userModel = db.User;
    console.log(repositories);
    this._userRepository = new repositories.userRepository(userModel);
  }

  async findAllUsers() {
    return this._userRepository.findAll();
  }

  async findUserById(id) {
    return this._userRepository.findById(id);
  }
}

module.exports = UserService;
