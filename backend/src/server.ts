import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from 'dotenv';
import { createServer } from 'http';
import { toNodeHandler } from 'better-auth/node';

import connectDB from './config/db';
import { errorHandler, notFound } from './middleware/errorHandler';
import { auth } from './lib/auth-express';

// Load environment variables
config();

// Connect to database
connectDB();

const app = express();
const server = createServer(app);

// CORS configuration - MUST be before any route handlers
const allowedOrigins = [
  // Development URLs
  'http://localhost:5173', // Vite dev server (default)
  'http://localhost:5174', // Vite dev server (alternative port)
  'http://localhost:4173', // Vite production preview
  'http://localhost:3000', // Backend dev server
  'http://localhost:3001', // Alternative backend port

  // Production URLs
  process.env.FRONTEND_URL, // Custom frontend URL from env
  process.env.FRONTEND_PROD_URL, // Production frontend URL from env

  // Specific production URLs
  'https://third-bracket-assignment.vercel.app',
  'https://third-bracket-assignment-production.up.railway.app',

  // Vercel deployment URLs (pattern matching)
  /^https:\/\/.*\.vercel\.app$/, // Any Vercel app
  /^https:\/\/.*\.vercel\.app\/.*$/, // Any Vercel app with path

  // Other common production patterns
  /^https:\/\/.*\.netlify\.app$/, // Netlify deployments
  /^https:\/\/.*\.github\.io$/, // GitHub Pages
].filter(Boolean); // Remove any undefined values

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check if origin is in allowed list
      const isAllowed = allowedOrigins.some((allowedOrigin) => {
        if (typeof allowedOrigin === 'string') {
          return origin === allowedOrigin;
        }
        if (allowedOrigin instanceof RegExp) {
          return allowedOrigin.test(origin);
        }
        return false;
      });

      if (isAllowed) {
        callback(null, true);
      } else {
        console.warn(`CORS blocked request from origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'User-Agent',
      'Cache-Control',
      'Pragma',
    ],
    exposedHeaders: [
      'Authorization',
      'Set-Cookie',
      'Access-Control-Allow-Credentials',
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

// Middleware
app.use(helmet()); // Security headers
app.use(morgan('combined')); // Logging

// Handle preflight requests explicitly
app.options('*', (req, res) => {
  const origin = req.headers.origin;
  const isAllowed = allowedOrigins.some((allowedOrigin) => {
    if (typeof allowedOrigin === 'string') {
      return origin === allowedOrigin;
    }
    if (allowedOrigin instanceof RegExp) {
      return allowedOrigin.test(origin || '');
    }
    return false;
  });

  if (isAllowed) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With, Accept, Origin, User-Agent, Cache-Control, Pragma'
    );
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
      'Access-Control-Expose-Headers',
      'Authorization, Set-Cookie, Access-Control-Allow-Credentials'
    );
    res.status(204).send();
  } else {
    res.status(403).json({ error: 'CORS policy violation' });
  }
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Better Auth handler must be mounted after CORS and express.json()
// For Express.js v5, we need to use the splat parameter
app.all('/api/auth/*splat', toNodeHandler(auth));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
import taskRoutes from './routes/tasks';

app.use('/api/tasks', taskRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;