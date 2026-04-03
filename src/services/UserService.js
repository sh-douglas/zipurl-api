import z from "zod";
import bcrypt from "bcryptjs";

import UserRepository from "../repositories/UserRepository.js";
import AppError from "../errors/AppError.js";

const UserSchema = z.object({
  name: z.string().trim(),
  email: z.string().email(),
  password: z.string().min(6),
});

class UserService {
  async register(data) {
    const cleanData = UserSchema.parse(data);
    const registeredEmail = await UserRepository.findByEmail(cleanData.email);

    if (registeredEmail) {
      throw new AppError("E-mail já cadastrado", 409);
    }

    const salt = await bcrypt.genSalt(8);

    const hashPassword = await bcrypt.hash(cleanData.password, salt);

    const newUser = await UserRepository.create(
      cleanData.name,
      cleanData.email,
      hashPassword,
    );

    const userResponse = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    return userResponse;
  }

  async userData(userId) {
    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}

export default new UserService();
