import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated, getUser, logout } from '../../utils/auth';

const Header = () => {
  const isLoggedIn = isAuthenticated();
  const user = getUser();

  const renderAuthButtons = () => {
    if (isLoggedIn && user) {
      return (
        <div className="flex items-center space-x-4">
          <Link
            to="/chat"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            Go to Chat
          </Link>
          <button
            onClick={logout}
            className="bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            Logout
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-4">
        <Link
          to="/register"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
        >
          Login
        </Link>
      </div>
    );
  };

  const renderMobileAuthButtons = () => {
    if (isLoggedIn && user) {
      return (
        <div className="flex items-center space-x-3">
          <Link
            to="/chat"
            className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
          >
            Chat
          </Link>
          <button
            onClick={logout}
            className="bg-white text-blue-500 border border-blue-500 px-3 py-1.5 rounded-lg text-sm font-medium"
          >
            Logout
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-3">
        <Link
          to="/register"
          className="bg-blue-500 text-white px-3 py-1.5 rounded-lg text-sm font-medium"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="bg-white text-blue-500 border border-blue-500 px-3 py-1.5 rounded-lg text-sm font-medium"
        >
          Login
        </Link>
      </div>
    );
  };

  return (
    <>
      {/* Early Pricing Banner - Mobile */}
      <div className="bg-amber-100 p-2 w-full md:hidden">
        <div className="container mx-auto flex items-center justify-center gap-2 text-sm">
          <span className="text-red-500 font-medium">🎯</span>
          <span className="text-gray-800 font-medium whitespace-nowrap">Early pricing - ₹13/day</span>
          <Link 
            to="/pricing" 
            className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium hover:bg-blue-600 transition-colors whitespace-nowrap"
          >
            Check Now →
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">A</span>
                </div>
                <span className="text-gray-900 text-lg font-semibold">AI Bharat India</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Early Pricing Banner - Desktop */}
              <div className="bg-amber-100 px-4 py-1.5 rounded-full">
                <span className="text-red-500 font-medium mr-2">🎯</span>
                <span className="text-gray-800 font-medium mr-2">Early pricing</span>
                <span className="text-gray-800 font-medium">Get Annual Plan at just ₹13/day</span>
                <Link 
                  to="/pricing" 
                  className="ml-3 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  Check Now →
                </Link>
              </div>

              {/* Auth Buttons */}
              {renderAuthButtons()}
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              {renderMobileAuthButtons()}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;