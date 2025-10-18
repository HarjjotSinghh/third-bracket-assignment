import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { createServer } from "http";
import { toNodeHandler, fromNodeHeaders } from "better-auth/node";

import connectDB from "./config/db";
import { errorHandler, notFound } from "./middleware/errorHandler";
import { auth } from "./auth";
import taskRoutes from "./routes/tasks";

// Load environment variables
dotenv.config({ path: '.env.better-auth' });

// Connect to database
connectDB();

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 3000;

// Mount Better Auth handler FIRST (before express.json())
app.all("/api/auth/*", toNodeHandler(auth));

// CORS configuration for Better Auth
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "http://localhost:5174",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// Security middleware
app.use(helmet());

// Logging middleware
app.use(morgan("combined"));

// Express JSON middleware (AFTER Better Auth handler)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running with Better Auth (Official Integration)",
    timestamp: new Date().toISOString(),
    auth: "Better Auth integrated with Express.js",
  });
});

// Better Auth session check endpoint
app.get("/api/me", async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    return res.json(session);
  } catch (error) {
    return res.status(401).json({
      authenticated: false,
      error: "Not authenticated",
    });
  }
});

// API routes
app.use("/api/tasks", taskRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || "http://localhost:5173"}`);
  console.log(`🔐 Better Auth integrated at: http://localhost:${PORT}/api/auth`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
  console.log(`🔍 Better Auth check: http://localhost:${PORT}/api/auth/ok`);
});

export default app;