/*Solo acceder a la base de datos */

import prisma from "../config/prisma.js";

type CreateUserData = {
  name: string;
  email: string;
  password: string;
  role: string;
};

class UserRepository {
  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: number) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: CreateUserData) {
    return prisma.user.create({
      data,
    });
  }
}

export default new UserRepository();
