import prisma from "../config/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";

class VehicleRepository {
  async findAll() {
    return prisma.vehicle.findMany({
      orderBy: {
        name: "asc",
      },
    });
  }

  async findById(id: number) {
    return prisma.vehicle.findUnique({
      where: {
        id,
      },
    });
  }

  async findByPlate(plate: string) {
    return prisma.vehicle.findUnique({
      where: {
        plate,
      },
    });
  }

  async create(data: Prisma.VehicleCreateInput) {
    return prisma.vehicle.create({
      data,
    });
  }

  async update(id: number, data: Prisma.VehicleUpdateInput) {
    return prisma.vehicle.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    return prisma.vehicle.delete({
      where: {
        id,
      },
    });
  }
}

export default new VehicleRepository();
