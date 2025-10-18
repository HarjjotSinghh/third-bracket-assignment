import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // @ts-expect-error - import.meta.env is not defined
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  // You can add plugins here if needed
  plugins: [],
});