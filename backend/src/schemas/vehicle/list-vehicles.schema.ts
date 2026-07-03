import { z } from "zod";

const sortableFields = [
  "name",
  "plate",
  "brand",
  "model",
  "status",
  "speed",
  "lastCommunication",
  "createdAt",
] as const;

export const listVehiclesSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.enum(["MOVING", "STOPPED", "OFFLINE"]).optional(),
  search: z.string().trim().optional(),
  sort: z.enum(sortableFields).default("name"),
  order: z.enum(["asc", "desc"]).default("asc"),
});

export type ListVehiclesDto = z.infer<typeof listVehiclesSchema>;
