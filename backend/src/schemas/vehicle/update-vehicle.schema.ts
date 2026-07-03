import { z } from "zod";

//export const updateVehicleSchema = createVehicleSchema.partial();

export const updateVehicleSchema = z.object({
  name: z.string().min(2).max(100).optional(),

  plate: z.string().trim().toUpperCase().optional(),

  brand: z.string().optional(),

  model: z.string().optional(),

  year: z
    .number()
    .int()
    .gte(1990)
    .lte(new Date().getFullYear() + 1)
    .optional(),

  status: z.enum(["MOVING", "STOPPED", "OFFLINE"]).optional(),

  lastLatitude: z.number().optional(),

  lastLongitude: z.number().optional(),

  speed: z.number().optional(),
});

export type UpdateVehicleDto = z.infer<typeof updateVehicleSchema>;
