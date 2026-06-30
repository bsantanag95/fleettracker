import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { Role } from "../constants/roles.js";

type JwtPayload = {
  userId: number;
  role: Role;
};

export function generateToken(payload: JwtPayload) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
}
