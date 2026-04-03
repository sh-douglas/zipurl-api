import z from "zod";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserRepository from "../repositories/UserRepository.js";
import AppError from "../errors/AppError.js";

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

class AuthService {
  async login(data) {
    const cleanData = UserSchema.parse(data);
    const existedUser = await UserRepository.findByEmail(cleanData.email);

    if (!existedUser) {
      throw new AppError("E-mail ou senha inválidos.", 401);
    }

    const isPasswordValid = await bcrypt.compare(
      cleanData.password,
      existedUser.password,
    );

    if (!isPasswordValid) {
      throw new AppError("E-mail ou senha inválidos.", 401);
    }

    const token = jwt.sign({ sub: existedUser.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const user = {
      id: existedUser.id,
      name: existedUser.name,
      email: existedUser.email,
    };

    return {
      user,
      token,
    };
  }
}

export default new AuthService();
