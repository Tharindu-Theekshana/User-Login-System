// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  // Don't add Authorization header for auth endpoints
  if (config.url.includes('/auth/login') || config.url.includes('/auth/register')) {
    return config;
  }

  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', {
      username: userData.signupUsername,
      password: userData.signupPassword,
      confirmPassword: userData.confirmPassword
    });
    return response.data;
  },

  login: async (userData) => {
    console.log("Logging in with:", userData);
    const response = await api.post('/auth/login', {
        username: userData.loginUsername,
        password: userData.loginPassword

    });
    return response.data;
    
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('token');
    return response.data;
  }
};

export default api;