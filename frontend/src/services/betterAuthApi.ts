// Better Auth compatible API service
// This service uses fetch with credentials to work with Better Auth sessions

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

// Helper function to make authenticated requests
const makeRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    credentials: 'include', // Important for Better Auth sessions
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, defaultOptions);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Task API using Better Auth sessions
export const taskAPI = {
  getAll: async (params?: {
    status?: string;
    priority?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/tasks?${queryString}` : '/tasks';
    
    return makeRequest(endpoint);
  },

  getById: async (id: string) => {
    return makeRequest(`/tasks/${id}`);
  },

  create: async (taskData: {
    title: string;
    description?: string;
    priority?: string;
    status?: string;
    dueDate?: string;
  }) => {
    return makeRequest('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  },

  update: async (id: string, taskData: {
    title?: string;
    description?: string;
    priority?: string;
    status?: string;
    dueDate?: string;
  }) => {
    return makeRequest(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  },

  delete: async (id: string) => {
    return makeRequest(`/tasks/${id}`, {
      method: 'DELETE',
    });
  },

  getStats: async () => {
    return makeRequest('/tasks/stats');
  },
};

export default taskAPI;
