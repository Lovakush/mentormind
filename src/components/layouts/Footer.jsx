import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg font-semibold">M</span>
              </div>
              <span className="text-gray-900 text-lg font-semibold">Mentor</span>
            </div>
            <p className="text-gray-600 text-sm">
              MentorMind is your personal mentor to help class 8-12th students in their exam preparation
            </p>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Follow us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Youtube className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900">
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Company Section */}
          <div className="space-y-4">
            <h3 className="text-gray-900 font-medium">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-gray-900">About us</Link>
              </li>
              <li>
                <Link to="/blogs" className="text-gray-600 hover:text-gray-900">Blogs</Link>
              </li>
              <li>
                <Link to="/join-us" className="text-gray-600 hover:text-gray-900">Join Us</Link>
              </li>
            </ul>
          </div>

          {/* Explore Batches Section */}
          <div className="space-y-4">
            <h3 className="text-gray-900 font-medium">Explore Classes</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/focus-2027" className="text-gray-600 hover:text-gray-900">Class 8</Link>
              </li>
              <li>
                <Link to="/focus-2026" className="text-gray-600 hover:text-gray-900">Class 9</Link>
              </li>
              <li>
                <Link to="/prelims" className="text-gray-600 hover:text-gray-900">Class 10</Link>
              </li>
              <li>
                <Link to="/prelims" className="text-gray-600 hover:text-gray-900">Class 11</Link>
              </li>
              <li>
                <Link to="/prelims" className="text-gray-600 hover:text-gray-900">Class 12</Link>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="space-y-4">
            <h3 className="text-gray-900 font-medium">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <div className="space-y-1">
                  <p className="text-gray-600">Student Queries</p>
                  <a href="mailto:ask@superkalam.com" className="text-blue-500 hover:text-blue-600">
                    ask@mentormind.com
                  </a>
                </div>
              </li>
              <li>
                <div className="space-y-1">
                  <p className="text-gray-600">General Queries</p>
                  <a href="mailto:hello@superkalam.com" className="text-blue-500 hover:text-blue-600">
                    hello@mentormind.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 text-sm">
              © MentorMind Technologies Private Limited
            </p>
            <div className="flex space-x-4 text-sm">
              <Link to="/terms" className="text-gray-600 hover:text-gray-900">Terms</Link>
              <span className="text-gray-300">•</span>
              <Link to="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link>
              <span className="text-gray-300">•</span>
              <Link to="/refund" className="text-gray-600 hover:text-gray-900">Refund Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;