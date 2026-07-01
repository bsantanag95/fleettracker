import vehicleRepository from "../repositories/vehicle.repository.js";
import { ConflictError } from "../errors/conflict-error.js";
import type { CreateVehicleDto } from "../schemas/vehicle/create-vehicle.schema.js";
import { VehicleStatus } from "../../generated/prisma/enums.js";

class VehicleService {
  async getAll() {
    return vehicleRepository.findAll();
  }

  async getById(id: number) {
    return vehicleRepository.findById(id);
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
}

export default new VehicleService();
