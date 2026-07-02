import { Router } from "express";
import vehicleController from "../controllers/vehicle.controller.js";
import { authenticate } from "../middleware/auth/auth.middleware.js";
import { authorize } from "../middleware/auth/authorize.middleware.js";
import { validate } from "../middleware/validation/validate-middleware.js";
import { createVehicleSchema } from "../schemas/vehicle/create-vehicle.schema.js";
import { UserRole } from "../../generated/prisma/enums.js";

const router = Router();

router.get(
  "/",
  authenticate,
  authorize(UserRole.ADMIN, UserRole.OPERATOR),
  vehicleController.getAll,
);

router.get(
  "/:id",
  authenticate,
  authorize(UserRole.ADMIN, UserRole.OPERATOR),
  vehicleController.getById,
);

router.post(
  "/",
  authenticate,
  authorize(UserRole.ADMIN),
  validate(createVehicleSchema),
  vehicleController.create,
);

export default router;
