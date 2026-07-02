import type { Request, Response, NextFunction } from "express";
import vehicleService from "../services/vehicle.service.js";
import { asyncHandler } from "../middleware/common/async-handler.middleware.js";

class VehicleController {
  getAll = asyncHandler(async (req: Request, res: Response) => {
    const vehicles = await vehicleService.getAll();
    res.json(vehicles);
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const vehicle = await vehicleService.getById(Number(req.params.id));

    res.json(vehicle);
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const vehicle = await vehicleService.create(req.body);

    res.status(201).json(vehicle);
  });
}

export default new VehicleController();
