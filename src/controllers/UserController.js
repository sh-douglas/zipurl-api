import UserService from "../services/UserService.js";

class UserController {
  async register(req, res, next) {
    try {
      const newUser = await UserService.register(req.body);

      return res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  async show(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await UserService.userData(userId);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
