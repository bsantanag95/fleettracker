import vehicleRepository from "../repositories/vehicle.repository.js";
import { ConflictError } from "../errors/conflict-error.js";
import { NotFoundError } from "../errors/not-found-error.js";
import type { CreateVehicleDto } from "../schemas/vehicle/create-vehicle.schema.js";
import { VehicleStatus } from "../../generated/prisma/enums.js";
import type { UpdateVehicleDto } from "../schemas/vehicle/update-vehicle.schema.js";
import type { Prisma } from "../../generated/prisma/client.js";
import type { ListVehiclesDto } from "../schemas/vehicle/list-vehicles.schema.js";

class VehicleService {
  async getAll(filters: ListVehiclesDto) {
    return vehicleRepository.findAll(filters);
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
    const vehicle = await vehicleRepository.findById(id);

    if (!vehicle) {
      throw new NotFoundError("Vehicle not found");
    }

    if (data.plate && data.plate !== vehicle.plate) {
      const plateExists = await vehicleRepository.findByPlate(data.plate);

      if (plateExists) {
        throw new ConflictError("Vehicle plate already exists");
      }
    }

    const updateData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined),
    );

    return vehicleRepository.update(
      id,
      updateData as Prisma.VehicleUpdateInput,
    );
  }

  async delete(id: number) {
    await this.getById(id);
    return vehicleRepository.update(id, { isActive: false });
  }
}

export default new VehicleService();
