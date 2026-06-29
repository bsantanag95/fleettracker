import userRepository from "../repositories/user.repository.js";
import type { RegisterDto } from "../schemas/auth/register.dto.js";
import { hashPassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

class AuthService {
  async register(data: RegisterDto) {
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email already exist");
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: "operator",
    });

    const token = generateToken({
      userId: user.id,
      role: user.role,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}

export default new AuthService();
