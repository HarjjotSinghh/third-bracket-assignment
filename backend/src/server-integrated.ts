import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createServer } from 'http';

import connectDB from './config/db';
import { errorHandler, notFound } from './middleware/errorHandler';
import { auth, authHandler } from './lib/auth-express';
import taskRoutes from './routes/tasks';

// Load environment variables
dotenv.config({ path: ['.env', '../.env', '../../.env'] });

// Connect to database (keeping existing MongoDB connection)
connectDB();

const app = express();
const server = createServer(app);

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS configuration - Enhanced for Better Auth
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5174', // Allow the current dev server port
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running with Better Auth',
    timestamp: new Date().toISOString(),
    auth: 'Better Auth integrated',
  });
});

// Better Auth routes - Must be before other routes
app.use('/api/auth', authHandler);

// API routes
app.use('/api/tasks', taskRoutes);

// Better Auth session check endpoint (for frontend verification)
app.get('/api/auth/check', async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    res.json({
      authenticated: !!session?.user,
      user: session?.user,
    });
  } catch (error) {
    res.status(401).json({
      authenticated: false,
      error: 'Not authenticated',
    });
  }
});

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`🔐 Better Auth integrated at: http://localhost:${PORT}/api/auth`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📝 Health check: http://localhost:${PORT}/health`);
});

export default app;