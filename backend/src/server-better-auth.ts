import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createServer } from 'http';

import connectDB from './config/db';
import { errorHandler, notFound } from './middleware/errorHandler';
import { auth } from './lib/auth-memory';
import taskRoutes from './routes/tasks';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
const server = createServer(app);

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5174', // Allow the current dev server port
  ],
  credentials: true,
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// Better Auth handler
app.use("/api/auth", auth.handler);

// API routes
app.use('/api/tasks', taskRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Better Auth integration enabled`);
});

export default app;