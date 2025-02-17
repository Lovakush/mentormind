// src/components/ProtectedRoute.jsx
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated, logout } from '../utils/auth';
import useAuthCheck from '../hooks/useAuthCheck';


const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const authenticated = isAuthenticated();
  useAuthCheck();
  useEffect(() => {
    // If not authenticated, clear any stale data
    if (!authenticated) {
      logout();
    }
  }, [authenticated]);

  if (!authenticated) {
    // Redirect to login with return path
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;