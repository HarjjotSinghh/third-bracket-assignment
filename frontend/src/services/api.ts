import axios from 'axios';
 
// @ts-expect-error - import.meta.env is not defined
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const authAPI = {
  register: (userData: { name: string; email: string; password: string }) =>
    api.post('/auth/register', userData),

  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),

  logout: () =>
    api.post('/auth/logout'),

  verify: () =>
    api.get('/auth/verify'),
};

export const taskAPI = {
  getAll: (params?: {
    status?: string;
    priority?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => api.get('/tasks', { params }),

  getById: (id: string) => api.get(`/tasks/${id}`),

  create: (taskData: {
    title: string;
    description?: string;
    priority?: string;
    status?: string;
    dueDate?: string;
  }) => api.post('/tasks', taskData),

  update: (id: string, taskData: {
    title?: string;
    description?: string;
    priority?: string;
    status?: string;
    dueDate?: string;
  }) => api.put(`/tasks/${id}`, taskData),

  delete: (id: string) => api.delete(`/tasks/${id}`),

  getStats: () => api.get('/tasks/stats'),
};

export default api;