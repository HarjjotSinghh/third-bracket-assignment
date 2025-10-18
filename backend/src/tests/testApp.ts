import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer } from 'http';

import { errorHandler, notFound } from '../middleware/errorHandler';

// Create Express app without database connection for testing
const app = express();
const server = createServer(app);

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173',
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

// API routes
import authRoutes from '../routes/auth';
import taskRoutes from '../routes/tasks';

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

export default app;