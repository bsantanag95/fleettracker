import type { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/unauthorized-error.js";

export function authorize(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new UnauthorizedError("Authentication required"));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new UnauthorizedError(
          "You don't have permission to perform this action",
        ),
      );
    }

    next();
  };
}
