// src/api/auth.js
import axios from 'axios';
import { logout, isTokenExpired } from '../utils/auth';

const AI_BACKEND = import.meta.env.VITE_AI_BACKEND || 'http://localhost:8765/api';

const api = axios.create({
  baseURL: AI_BACKEND,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor with token validation
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    // Check if token exists and is not expired
    if (token) {
      if (isTokenExpired(token)) {
        logout();
        return Promise.reject('Session expired');
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      logout();
    }
    return Promise.reject(error);
  }
);

// Helper function to format phone number
const formatPhoneNumber = (phone) => phone.startsWith('+91') ? phone : `+91${phone}`;

// Send OTP
export const sendOTP = async (phone_number) => {
  try {
    const response = await api.post('/auth/send-verification', {
      phone_number: formatPhoneNumber(phone_number),
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to send OTP',
    };
  }
};

// Verify OTP
export const verifyOTP = async (phone_number, code) => {
  try {
    const response = await api.post('/auth/verify-otp', {
      phone_number: formatPhoneNumber(phone_number),
      code,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to verify OTP',
    };
  }
};

// Register new user
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', {
      ...userData,
      phone_number: formatPhoneNumber(userData.phone_number),
    });

    // Don't store token after registration, just return success
    return {
      success: true,
      data: response.data
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to register user',
    };
  }
};

// Add this to your auth.js
export const loginUser = async (phone_number, otp_code, forceLogin = false) => {
  try {
    const response = await api.post('/auth/login', {
      phone_number: formatPhoneNumber(phone_number),
      otp_code,
      force_login: forceLogin
    });

    const { data } = response;
    
    if (data.success) {
      return {
        success: true,
        data: {
          access_token: data.access_token,
          expires_at: data.expires_at,
          user: data.user
        }
      };
    }

    return {
      success: false,
      error: data.error || 'Login failed'
    };

  } catch (error) {
    // console.error('Login error:', error.response?.data);
    
    if (error.response?.status === 404) {
      return {
        success: false,
        error: 'User not found. Please register first.'
      };
    }
    
    if (error.response?.status === 409) {
      // Enhanced device info handling
      const deviceInfo = error.response.data.deviceInfo;
      return {
        success: false,
        error: 'ACTIVE_SESSION_EXISTS',
        deviceInfo: {
          browser: deviceInfo.browser,
          os: deviceInfo.os,
          lastLoginTime: deviceInfo.lastLoginTime
        }
      };
    }

    return {
      success: false,
      error: error.response?.data?.error || 'Failed to login'
    };
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    await api.post('/auth/logout');
    logout(); // This will clear localStorage and redirect
    return {
      success: true
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.error || 'Failed to logout'
    };
  }
};

// Get current user
export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  try {
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token && !isTokenExpired(token);
};

export default api;