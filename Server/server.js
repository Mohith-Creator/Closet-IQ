//server.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import itemRoutes from "./routes/items.js";
import outfitRoutes from "./routes/outfits.js";
import recommendationRoutes from "./routes/recommendation.js";
import plannerRoutes from "./routes/planner.js";
import errorHandler from "./middleware/errorMiddleware.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

//Health-Check Endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ClosetIQ API is running",
    version: "1.0.0",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/outfits", outfitRoutes);
app.use("/api/outfits/recommendations", recommendationRoutes);
app.use("/api/planner", plannerRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.originalUrl}' not found`,
  });
});

//Global Error Handler
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
