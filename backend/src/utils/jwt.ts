import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

type JwtPayload = {
  userId: number;
  role: string;
};

export function generateToken(payload: JwtPayload) {
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "7d",
  });
}
