import { createAuthClient } from "better-auth/react";

// Custom fetch function to handle JSON serialization issues
const customFetch = async (url: string, options: RequestInit = {}) => {
  const modifiedOptions: RequestInit = { ...options };
  
  // Ensure proper JSON serialization for non-GET requests
  if (options.method && options.method !== 'GET' && options.body) {
    // If body is an object (not already a string or FormData), stringify it
    if (typeof options.body === 'object' && !(options.body instanceof FormData) && !(options.body instanceof URLSearchParams)) {
      modifiedOptions.body = JSON.stringify(options.body);
      modifiedOptions.headers = {
        ...modifiedOptions.headers,
        'Content-Type': 'application/json',
      };
      
      // Debug logging for development
      if (import.meta.env.DEV) {
        console.log('Auth request body serialized:', modifiedOptions.body);
      }
    }
  }
  
  // Ensure credentials are included
  modifiedOptions.credentials = 'include';
  
  // Ensure proper headers
  modifiedOptions.headers = {
    'Content-Type': 'application/json',
    ...modifiedOptions.headers,
  };
  
  try {
    const response = await fetch(url, modifiedOptions);
    
    // Debug logging for development
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
    headers: {
      'Content-Type': 'application/json',
    },
  },
  baseURL:
    import.meta.env.VITE_BETTER_AUTH_API_BASE_URL ||
    "http://localhost:3000/api/auth",
  // You can add plugins here if needed
  plugins: [],
  // Use custom fetch to ensure proper JSON serialization
  fetch: customFetch,
});