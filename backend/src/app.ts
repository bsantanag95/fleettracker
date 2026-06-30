import express from "express";
import cors from "cors";
import healthRouter from "./routes/health.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/auth", authRoutes);

app.use(errorMiddleware);

export default app;
