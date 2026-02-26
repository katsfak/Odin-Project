import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// Routes
import characterRoutes from "./routes/characterRoutes.js";
import highScoreRoutes from "./routes/highScoreRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import validationRoutes from "./routes/validationRoutes.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

// Routes
app.use("/api/images", imageRoutes);
app.use("/api/characters", characterRoutes);
app.use("/api/validate", validationRoutes);
app.use("/api/high-scores", highScoreRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || "Something went wrong" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
