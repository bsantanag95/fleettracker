import type { Request, Response, NextFunction } from "express";
import vehicleService from "../services/vehicle.service.js";
import { asyncHandler } from "../middleware/common/async-handler.middleware.js";
import { listVehiclesSchema } from "../schemas/vehicle/list-vehicles.schema.js";

class VehicleController {
  getAll = asyncHandler(async (req, res) => {
    const filters = listVehiclesSchema.parse(req.query);
    const result = await vehicleService.getAll(filters);

    res.json(result);
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const vehicle = await vehicleService.getById(Number(req.params.id));

    res.json(vehicle);
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const vehicle = await vehicleService.create(req.body);

    res.status(201).json(vehicle);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const vehicle = await vehicleService.update(
      Number(req.params.id),
      req.body,
    );
    res.json(vehicle);
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    await vehicleService.delete(Number(req.params.id));
    res.status(204).send();
  });
}

export default new VehicleController();
