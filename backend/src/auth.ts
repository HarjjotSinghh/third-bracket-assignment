import { betterAuth } from "better-auth";
import { memoryAdapter } from "better-auth/adapters/memory";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || "better-auth-secret-change-in-production",

  // Database configuration - using memory adapter for development
  database: memoryAdapter({
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
    useSecureCookies: process.env.NODE_ENV === "production",
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