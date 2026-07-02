import type { Request, Response, NextFunction } from "express";
import authService from "../services/auth.service.js";
import { asyncHandler } from "../middleware/common/async-handler.middleware.js";

class AuthController {
  register = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body);

    res.status(201).json(result);
  });

  login = asyncHandler(async (req, res) => {
    const result = await authService.login(req.body);

    res.json(result);
  });
  async profile(req: Request, res: Response) {
    return res.status(200).json({
      user: req.user,
    });
  }
}

export default new AuthController();
