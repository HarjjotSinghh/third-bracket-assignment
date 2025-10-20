import { BetterFetchOption, createAuthClient } from "better-auth/react";

// Utility function to get headers dynamically
function getAuthHeaders() {
  // You can extend this with logic to add custom headers as needed, e.g., tokens from storage
  return {
    'Content-Type': 'application/json',
    // Example: Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  };
}

// Custom fetch function to handle JSON serialization issues and set headers
const customFetch = async (url: string, options: RequestInit = {}) => {
  const modifiedOptions: RequestInit = { ...options };

  // Ensure proper JSON serialization for non-GET requests
  if (options.method && options.method !== 'GET' && options.body) {
    if (
      typeof options.body === 'object' &&
      !(options.body instanceof FormData) &&
      !(options.body instanceof URLSearchParams)
    ) {
      modifiedOptions.body = JSON.stringify(options.body);
      modifiedOptions.headers = {
        ...getAuthHeaders(),
        ...modifiedOptions.headers,
      };

      if (import.meta.env.DEV) {
        console.log('Auth request body serialized:', modifiedOptions.body);
      }
    }
  }

  // Always include credentials and merge headers
  modifiedOptions.credentials = 'include';
  modifiedOptions.headers = {
    ...getAuthHeaders(),
    ...modifiedOptions.headers,
  };

  try {
    const response = await fetch(url, modifiedOptions);

    if (import.meta.env.DEV) {
      console.log('Auth response status:', response.status);
    }

    return response;
  } catch (error) {
    console.error('Auth fetch error:', error);
    throw error;
  }
};

export const authClient = createAuthClient({
  fetchOptions: {
    credentials: 'include',
    // headers: getAuthHeaders(),
  } as BetterFetchOption,
  baseURL:
    import.meta.env.VITE_BETTER_AUTH_API_BASE_URL ||
    "http://localhost:3000/api/auth",
  plugins: [],
  fetch: customFetch,
});