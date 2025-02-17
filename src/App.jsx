// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load components
const Home = React.lazy(() => import('./pages/Home'));
const Chat = React.lazy(() => import('./pages/Chat'));
const LoginPage = React.lazy(() => import('./components/LoginPage'));
const RegisterPage = React.lazy(() => import('./components/RegisterPage'));
const PricingPage = React.lazy(() => import('./pages/Pricing'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/pricing" element={<PricingPage />} />

          {/* Protected routes */}
          <Route path="/chat" element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;