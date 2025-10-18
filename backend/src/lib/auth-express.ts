import { betterAuth } from "better-auth";
import { memoryAdapter } from "better-auth/adapters/memory";
import { express } from "better-auth/adapters/express";

// In-memory adapter for development
// For production, replace with proper database adapter
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || "better-auth-secret-change-in-production",

  database: memoryAdapter({
    // Customize the user schema to match our needs
    user: {
      additionalFields: {
        name: {
          type: "string",
          required: true,
        },
        emailVerified: {
          type: "boolean",
          default: false,
        },
      },
    },
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

  // Advanced configuration
  advanced: {
    generateId: false, // Use default ID generation
    crossSubDomainCookies: {
      enabled: false,
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

  // Plugins
  plugins: [
    // Add express adapter
    express(),
  ],
});

// Export auth handler for Express
export const authHandler = auth.handler;