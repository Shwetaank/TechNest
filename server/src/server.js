import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import errorHandler from "./middlewares/errorHandler.js";
import startupLogger from "./utils/startupLogger.js";
import notFound from "./middlewares/notFound.js";

dotenv.config();

const app = express();

// Hide Express signature
app.disable("x-powered-by");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  }),
);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TechNest API is running 🚀",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// API Routes
// app.use("/api/v1", routes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Error Handler (Always Last)
app.use(errorHandler);

// Not Found Middleware
app.use(notFound);

const PORT = process.env.PORT || 8080;
const NODE_ENV = process.env.NODE_ENV || "development";

app.listen(PORT, () => {
  startupLogger({
    port: PORT,
    env: NODE_ENV,
  });
});
