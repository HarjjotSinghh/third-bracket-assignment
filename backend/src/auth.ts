import { betterAuth } from 'better-auth';
import { memoryAdapter } from 'better-auth/adapters/memory';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

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
  ].filter((origin): origin is string => typeof origin === 'string'), // Remove any undefined values and ensure only strings

  // Database configuration - using memory adapter for development
  database: mongodbAdapter(new MongoClient(process.env.MONGODB_URI!).db(), {
    // user: {
    //   additionalFields: [{
    //     name: {
    //       type: 'string',
    //       required: true,
    //     },
    //     emailVerified: {
    //       type: 'boolean',
    //       default: false,
    //     },
    //   },
    // }],
  }),

  // Email and password authentication
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Disable for development
    minPasswordLength: 6,
  },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  // Account configuration
  account: {
    accountLinking: {
      enabled: false,
    },
  },

  // Advanced configuration
  advanced: {
    generateId: false,
    crossSubDomainCookies: {
      enabled: false,
    },
    useSecureCookies: process.env.NODE_ENV === 'production',
  },

  // Social providers (commented out for now)
  socialProviders: {
    // Add social providers here if needed
    // google: {
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // },
  },
});
