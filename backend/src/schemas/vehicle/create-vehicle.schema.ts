import { z } from "zod";

export const createVehicleSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),

  plate: z.string().trim().toUpperCase(),
  //.regex(/^[A-Z]{3}-\d{4}$/, {
  //  message: "Plate must be in the format ABC-1234",
  // }),

  brand: z.string(),
  model: z.string(),
  year: z
    .number()
    .int()
    .gte(1990)
    .lte(new Date().getFullYear() + 1),

  lastLatitude: z.number(),
  lastLongitude: z.number(),
  speed: z.number().default(0),
});

export type CreateVehicleDto = z.infer<typeof createVehicleSchema>;
