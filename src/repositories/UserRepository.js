import User from "../models/User.js";

class UserRepository {
  async create(name, email, password) {
    return await User.create({ name: name, email: email, password: password });
  }
  async findByEmail(email) {
    return await User.findOne({ where: { email: email } });
  }
  async findById(id) {
    return await User.findOne({ where: { id: id } });
  }
}

export default new UserRepository();
