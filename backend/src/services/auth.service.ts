import userRepository from "../repositories/user.repository.js";
import type { RegisterDto } from "../schemas/auth/register.dto.js";
import { comparePassword, hashPassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { ConflictError } from "../errors/conflict-error.js";
import type { LoginDto } from "../schemas/auth/login.dto.js";
import { UnauthorizedError } from "../errors/unauthorized-error.js";

class AuthService {
  async register(data: RegisterDto) {
    const existingUser = await userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new ConflictError();
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

  async login(data: LoginDto) {
    const user = await userRepository.findByEmail(data.email);

    if (!user) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const passwordMatches = await comparePassword(data.password, user.password);

    if (!passwordMatches) {
      throw new UnauthorizedError("Invalid email or password");
    }

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
