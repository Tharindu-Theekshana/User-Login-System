// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
 
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
    console.log("Login request payload:", {
      username: userData.loginUsername,
      password: '***' 
    });
    
    try {
      const response = await api.post('/auth/login', {
        username: userData.loginUsername,
        password: userData.loginPassword
      });
      
      console.log("Login response:", {
        status: response.status,
        data: {
          ...response.data,
          token: response.data.token ? '***' : undefined,
          admin: response.data.admin
        }
      });

      // Store all necessary data
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        // Use admin field from response instead of isAdmin
        const adminStatus = Boolean(response.data.admin);
        console.log('Setting admin status from response:', { 
          adminStatus, 
          originalValue: response.data.admin,
          type: typeof response.data.admin 
        });
        localStorage.setItem('isAdmin', String(adminStatus));
        localStorage.setItem('userRoles', JSON.stringify(response.data.roles || []));
        
        // Verify stored values
        console.log('Stored Values After Login:', {
          hasToken: !!localStorage.getItem('token'),
          isAdmin: localStorage.getItem('isAdmin'),
          roles: localStorage.getItem('userRoles')
        });
      } else {
        console.error('No token received in login response');
      }
      
      
      return {
        ...response.data,
        isAdmin: response.data.admin
      };
    } catch (error) {
      console.error('Login API Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
      throw error;
    }
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userRoles');
    localStorage.clear();
    return response.data;
  },

  createAdmin: async (userData) => {
    const response = await api.post('/auth/create-admin', {
      username: userData.signupUsername,
      password: userData.signupPassword,
      confirmPassword: userData.confirmPassword
    });
    return response.data;
  },

  // Check if user is admin
  isAdmin: () => {
    const storedIsAdmin = localStorage.getItem('isAdmin');
    const isAdminUser = storedIsAdmin === 'true';
    
    console.log('Auth Service isAdmin Check:', {
      storedValue: storedIsAdmin,
      isAdminUser,
      type: typeof storedIsAdmin
    });
    
    return isAdminUser;
  },

  // Get user roles
  getUserRoles: () => {
    const roles = localStorage.getItem('userRoles');
    console.log('Auth Service getUserRoles:', {
      storedRoles: roles,
      parsedRoles: roles ? JSON.parse(roles) : []
    });
    return roles ? JSON.parse(roles) : [];
  }


};

export default api;