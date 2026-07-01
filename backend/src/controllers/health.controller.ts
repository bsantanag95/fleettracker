import type { Request, Response } from "express";
import prisma from "../config/prisma.js";

export const healthCheck = async (req: Request, res: Response) => {
  await prisma.$queryRaw`SELECT 1`;

  return res.json({
    message: "FleetTracker API running",
  });
};
