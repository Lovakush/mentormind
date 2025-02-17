// src/hooks/useAuthCheck.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from '../utils/auth';
import axios from 'axios';
import { AI_BACKEND } from '../../constants';


const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!isAuthenticated()) {
          logout();
          return;
        }

        // Verify token with backend
        await axios.get(`${AI_BACKEND}/auth/verify-session`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
      } catch (error) {
        if (error.response?.data?.code === 'SESSION_INVALIDATED' ||
            error.response?.data?.code === 'SESSION_EXPIRED' ||
            error.response?.data?.code === 'INVALID_TOKEN') {
          logout();
        }
      }
    };

    // Check immediately
    checkAuth();

    // Then check every 30 seconds
    const interval = setInterval(checkAuth, 30000);

    return () => clearInterval(interval);
  }, [navigate]);
};

export default useAuthCheck;