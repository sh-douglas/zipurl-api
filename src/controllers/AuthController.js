import AuthService from "../services/AuthService.js";

class AuthController {
  async login(req, res, next) {
    try {
      const user = await AuthService.login(req.body);

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
