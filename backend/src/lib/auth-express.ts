import { betterAuth } from "better-auth";
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { openAPI } from 'better-auth/plugins';

config({ path: ['./.env', './../.env', './../../.env', './../../../.env'] });

// Create a new MongoDB client for Better Auth
const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db();

// MongoDB adapter using dedicated connection
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000/api/auth',
  secret:
    process.env.BETTER_AUTH_SECRET || 'better-auth-secret-change-in-production',
  trustedOrigins: [
    // Development URLs
    'http://localhost:5173', // Vite dev server (default)
    'http://localhost:5174', // Vite dev server (alternative port)
    'http://localhost:4173', // Vite production preview
    'http://localhost:3000', // Backend dev server
    'http://localhost:3001', // Alternative backend port

    // Production URLs from environment
    process.env.FRONTEND_URL,
    process.env.FRONTEND_PROD_URL,

    // Specific production URLs
    'https://third-bracket-assignment.vercel.app',
  ].filter((origin): origin is string => typeof origin === 'string'), // Remove any undefined values and ensure only strings

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Disable for development
    minPasswordLength: 6,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  account: {
    accountLinking: {
      enabled: false,
    },
  },
  plugins: [openAPI()],
  // Advanced configuration
  advanced: {
    generateId: false, // Use default ID generation
    crossSubDomainCookies: {
      enabled: false,
    },
    useSecureCookies: process.env.NODE_ENV === 'production',
    // Explicit cookie configuration for cross-origin production deployment
    cookies: {
      session_token: {
        attributes: {
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          httpOnly: true,
          path: '/',
          ...(process.env.NODE_ENV === 'production' && { partitioned: true }),
        },
      },
      session_data: {
        attributes: {
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
          httpOnly: true,
          path: '/',
          ...(process.env.NODE_ENV === 'production' && { partitioned: true }),
        },
      },
    },
  },

  // Social providers (commented out for now)
  socialProviders: {
    // google: {
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // },
    // github: {
    //   clientId: process.env.GITHUB_CLIENT_ID!,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    // },
  },
});

// Export auth handler for Express
export const authHandler = auth.handler;