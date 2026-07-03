import prisma from "../config/prisma.js";
import { Prisma } from "../../generated/prisma/client.js";
import type { ListVehiclesDto } from "../schemas/vehicle/list-vehicles.schema.js";

class VehicleRepository {
  async findAll(filters: ListVehiclesDto) {
    const skip = (filters.page - 1) * filters.limit;
    const where: Prisma.VehicleWhereInput = {};

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.search) {
      where.OR = [
        {
          plate: {
            contains: filters.search,
            mode: "insensitive",
          },
        },

        {
          name: {
            contains: filters.search,
            mode: "insensitive",
          },
        },

        {
          brand: {
            contains: filters.search,
            mode: "insensitive",
          },
        },
      ];
    }

    const [vehicles, total] = await prisma.$transaction([
      prisma.vehicle.findMany({
        where,

        skip,

        take: filters.limit,

        orderBy: {
          [filters.sort]: filters.order,
        },
      }),

      prisma.vehicle.count({
        where,
      }),
    ]);
    return {
      data: vehicles,

      pagination: {
        page: filters.page,

        limit: filters.limit,

        total,

        totalPages: Math.ceil(total / filters.limit),
      },
    };
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
