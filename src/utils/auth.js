// src/utils/auth.js

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('expires_at');
  window.location.href = '/login';
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUser = () => {
  const userStr = localStorage.getItem('user');
  try {
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    logout();
    return null;
  }
};

export const isTokenExpired = () => {
  const expiresAt = localStorage.getItem('expires_at');
  if (!expiresAt) return true;
  return new Date() > new Date(expiresAt);
};

export const isAuthenticated = () => {
  const token = getToken();
  return token && !isTokenExpired();
};

// Setup axios interceptor to handle token invalidation
import axios from 'axios';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle session invalidation
      if (error.response.status === 401 && 
          error.response.data?.code === 'SESSION_INVALIDATED') {
        console.log('Session invalidated, logging out...');
        logout();
        return Promise.reject(error);
      }

      // Handle session expiration
      if (error.response.status === 401 && 
          error.response.data?.code === 'SESSION_EXPIRED') {
        console.log('Session expired, logging out...');
        logout();
        return Promise.reject(error);
      }

      // Handle invalid token
      if (error.response.status === 403 && 
          error.response.data?.code === 'INVALID_TOKEN') {
        console.log('Invalid token, logging out...');
        logout();
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);