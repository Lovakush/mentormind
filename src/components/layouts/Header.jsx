import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu } from 'lucide-react';

const Header = () => {
  const [isExploreBatchesOpen, setIsExploreBatchesOpen] = useState(false);

  const batchClasses = [
    'Class 8',
    'Class 9',
    'Class 10',
    'Class 11',
    'Class 12'
  ];

  return (
    <>
      {/* Early Pricing Banner - Mobile */}
      <div className="bg-amber-100 p-2 text-center md:hidden">
        <div className="flex items-center justify-center space-x-2 text-sm">
          <span className="text-red-500 font-medium">🎯</span>
          <span className="text-gray-800 font-medium">Early pricing - ₹13/day</span>
          <Link 
            to="/pricing" 
            className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium hover:bg-blue-600 transition-colors"
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
                  <span className="text-white text-lg font-semibold">M</span>
                </div>
                <span className="text-gray-900 text-lg font-semibold">MentorMind</span>
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

              {/* Explore Batches Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsExploreBatchesOpen(!isExploreBatchesOpen)}
                  className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
                >
                  <span className="text-sm font-medium">Explore Classes</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Dropdown Menu */}
                {isExploreBatchesOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    {batchClasses.map((className) => (
                      <Link
                        key={className}
                        to={`/batches/${className.toLowerCase().replace(' ', '-')}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        {className}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/login"
                className="bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors"
              >
                Login
              </Link>
            </div>

            {/* Mobile Navigation */}
            <div className="flex items-center space-x-4 md:hidden">
              {/* Mobile Explore Batches */}
              <button 
                onClick={() => setIsExploreBatchesOpen(!isExploreBatchesOpen)}
                className="text-gray-700"
              >
                <span className="text-sm font-medium mr-1">Explore Classes</span>
                <ChevronDown className="w-4 h-4 inline" />
              </button>

              <Link
                to="/login"
                className="bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded-lg text-sm font-medium"
              >
                Login
              </Link>

              <button className="text-gray-700">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Mobile Explore Batches Dropdown */}
          {isExploreBatchesOpen && (
            <div className="md:hidden border-t border-gray-100">
              {batchClasses.map((className) => (
                <Link
                  key={className}
                  to={`/batches/${className.toLowerCase().replace(' ', '-')}`}
                  className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                >
                  {className}
                </Link>
              ))}
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;