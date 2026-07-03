import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../errors/unauthorized-error.js";
import { verifyToken } from "../../utils/jwt.js";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new UnauthorizedError("Authentication required"));
  }

  const [type, token] = authHeader.split(" ");

  if (type != "Bearer" || !token) {
    return next(new UnauthorizedError("Invalid authorization header"));
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch {
    next(new UnauthorizedError("Invalid or expired token"));
  }
}
