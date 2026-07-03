import vehicleRepository from "../repositories/vehicle.repository.js";
import { ConflictError } from "../errors/conflict-error.js";
import { NotFoundError } from "../errors/not-found-error.js";
import type { CreateVehicleDto } from "../schemas/vehicle/create-vehicle.schema.js";
import { VehicleStatus } from "../../generated/prisma/enums.js";
import type { UpdateVehicleDto } from "../schemas/vehicle/update-vehicle.schema.js";
import type { Prisma } from "../../generated/prisma/client.js";

class VehicleService {
  async getAll() {
    return vehicleRepository.findAll();
  }

  async getById(id: number) {
    const vehicle = await vehicleRepository.findById(id);

    if (!vehicle) {
      throw new NotFoundError("Vehicle not found");
    }

    return vehicle;
  }

  async create(data: CreateVehicleDto) {
    const existingVehicle = await vehicleRepository.findByPlate(data.plate);

    if (existingVehicle) {
      throw new ConflictError("Vehicle plate alread exists");
    }

    return vehicleRepository.create({
      ...data,
      status: VehicleStatus.STOPPED,
      lastCommunication: new Date(),
    });
  }

  async update(id: number, data: UpdateVehicleDto) {
    await this.getById(id);

    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined),
    );

    return vehicleRepository.update(id, cleanData as Prisma.VehicleUpdateInput);
  }

  async delete(id: number) {
    await this.getById(id);
    return vehicleRepository.update(id, { isActive: false });
  }
}

export default new VehicleService();
