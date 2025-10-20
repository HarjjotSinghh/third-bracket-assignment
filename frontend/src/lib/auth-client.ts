import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  fetchOptions: {
    credentials: 'include',
  },
  baseURL:
    import.meta.env.VITE_BETTER_AUTH_API_BASE_URL ||
    "http://localhost:3000/api/auth",
  // You can add plugins here if needed
  plugins: [],
});