import axios from 'axios';
var API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
// Create axios instance with default configuration
var api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Request interceptor to add auth token
api.interceptors.request.use(function (config) {
    var token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = "Bearer ".concat(token);
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
// Response interceptor to handle errors
api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    var _a;
    if (((_a = error.response) === null || _a === void 0 ? void 0 : _a.status) === 401) {
        // Token expired or invalid
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});
// API endpoints
export var authAPI = {
    register: function (userData) {
        return api.post('/auth/register', userData);
    },
    login: function (credentials) {
        return api.post('/auth/login', credentials);
    },
    logout: function () {
        return api.post('/auth/logout');
    },
    verify: function () {
        return api.get('/auth/verify');
    },
};
export var taskAPI = {
    getAll: function (params) { return api.get('/tasks', { params: params }); },
    getById: function (id) { return api.get("/tasks/".concat(id)); },
    create: function (taskData) { return api.post('/tasks', taskData); },
    update: function (id, taskData) { return api.put("/tasks/".concat(id), taskData); },
    delete: function (id) { return api.delete("/tasks/".concat(id)); },
    getStats: function () { return api.get('/tasks/stats'); },
};
export default api;
