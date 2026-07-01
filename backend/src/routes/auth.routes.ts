import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate-middleware.js";
import { registerSchema } from "../schemas/auth/register.dto.js";
import { loginSchema } from "../schemas/auth/login.dto.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/profile", authenticate, authController.profile);

export default router;
