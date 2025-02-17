// src/components/RegisterPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { sendOTP, verifyOTP, registerUser } from '../api/auth';
import { setAuthToken } from '../utils/auth';


// Animations
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone_number: '',
    name: '',
    email: '',
    class: '',
    board_name: '',
    address: ''
  });

  // OTP States
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(24);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOTP = async (e) => {
    e?.preventDefault();
    if (!formData.phone_number || formData.phone_number.length !== 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await sendOTP(formData.phone_number);
      
      if (response.success) {
        setOtpSent(true);
        setTimer(24);
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPVerification = async (otpValue) => {
    setIsLoading(true);
    setError('');
  
    try {
      const response = await verifyOTP(formData.phone_number, otpValue);
  
      if (response.success) {
        if (response.data.isExistingUser) {
          setIsAlreadyRegistered(true); // Set this instead of navigating directly
        } else {
          setStep(2);
        }
      } else {
        setError(response.error);
        setOtp(['', '', '', '', '', '']);
        document.getElementById('otp-0')?.focus();
      }
    } catch (error) {
      setError('Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleRegistration = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) return setError('Please enter your name');
    if (!formData.email.trim()) return setError('Please enter your email');
    if (!formData.class) return setError('Please select your class');
    if (!formData.board_name) return setError('Please select your board');
    if (!formData.address.trim()) return setError('Please enter your address');
  
    setIsLoading(true);
    setError('');
  
    try {
      const response = await registerUser(formData);
  
      if (response.success) {
        setRegistrationSuccess(true);
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const boards = [
    { value: 'CBSE', label: 'CBSE' },
    { value: 'ICSE', label: 'ICSE' },
    { value: 'STATE', label: 'State Board' }
  ];

  const renderPhoneStep = () => (
    <motion.div
      {...fadeIn}
      className="space-y-6"
    >
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">
          AI Bharat India
        </h1>
        <h2 className="text-2xl font-bold">Welcome</h2>
        <p className="text-gray-600">Begin your learning journey with us</p>
      </div>

      {!otpSent ? (
        <div className="space-y-4">
          <div className="flex items-center w-full p-4 border border-blue-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
            <span className="text-gray-500 mr-2">+91</span>
            <input
              type="tel"
              value={formData.phone_number}
              onChange={(e) => setFormData({
                ...formData,
                phone_number: e.target.value.replace(/\D/g, '')
              })}
              className="w-full outline-none text-gray-500 bg-transparent"
              placeholder="Phone number"
              maxLength={10}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSendOTP}
            disabled={isLoading || formData.phone_number.length !== 10}
            className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-md disabled:opacity-50 shadow-lg"
          >
            {isLoading ? 'Sending...' : 'Get OTP'}
          </motion.button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-center">
            OTP sent to +91-{formData.phone_number}
            <button 
              onClick={() => setOtpSent(false)}
              className="text-orange-500 ml-2 hover:text-orange-600"
            >
              Edit
            </button>
          </p>
          <div className="flex justify-center space-x-3">
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => {
                  const newOTP = [...otp];
                  newOTP[index] = e.target.value.replace(/\D/g, '');
                  setOtp(newOTP);
                  if (e.target.value && index < 5) {
                    document.getElementById(`otp-${index + 1}`)?.focus();
                  }
                  if (index === 5 && e.target.value && !newOTP.includes('')) {
                    handleOTPVerification(newOTP.join(''));
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Backspace' && !digit && index > 0) {
                    document.getElementById(`otp-${index - 1}`)?.focus();
                  }
                }}
                className="w-12 h-12 text-center border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                maxLength={1}
              />
            ))}
          </div>
          <div className="text-center">
            <button
              onClick={() => timer === 0 && handleSendOTP()}
              disabled={timer > 0}
              className="text-orange-500 hover:text-orange-600 disabled:text-orange-300"
            >
              Resend OTP {timer > 0 ? `in ${timer}s` : ''}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );

  const renderProfileStep = () => (
    <motion.form
      {...fadeIn}
      onSubmit={handleRegistration}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Complete Your Profile</h2>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>

      <div className="space-y-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </motion.div>
        
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <select
            value={formData.class}
            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
            className="w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            required
          >
            <option value="">Select Class</option>
            {[8, 9, 10, 11, 12].map(num => (
              <option key={num} value={num}>Class {num}</option>
            ))}
          </select>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <select
            value={formData.board_name}
            onChange={(e) => setFormData({ ...formData, board_name: e.target.value })}
            className="w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            required
          >
            <option value="">Select Board</option>
            {boards.map(board => (
              <option key={board.value} value={board.value}>
                {board.label}
              </option>
            ))}
          </select>
        </motion.div>

        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-md disabled:opacity-50 shadow-lg"
        >
          {isLoading ? 'Registering...' : 'Complete Registration'}
        </motion.button>
      </div>
    </motion.form>
  );

  const renderSuccessScreen = () => (
    <motion.div
      {...fadeIn}
      className="text-center space-y-6"
    >
      <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
        <svg 
          className="w-10 h-10 text-green-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900">Registration Successful!</h2>
      <p className="text-gray-600">
        Your account has been created successfully. Please login to continue.
      </p>
      <button
        onClick={() => navigate('/login')}
        className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-md shadow-lg hover:shadow-xl transition-shadow"
      >
        Login Now
      </button>
    </motion.div>
  );

  const renderAlreadyRegisteredScreen = () => (
    <motion.div
      {...fadeIn}
      className="text-center space-y-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-20 h-20 bg-blue-100 rounded-full mx-auto flex items-center justify-center"
      >
        <svg 
          className="w-10 h-10 text-blue-500" 
          fill="none" 
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </motion.div>
      <h2 className="text-2xl font-bold text-gray-900">
        Already Registered!
      </h2>
      <p className="text-gray-600 px-4">
        You already have an account with this phone number. Please login to continue.
      </p>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/login')}
        className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-md shadow-lg hover:shadow-xl transition-all duration-200"
      >
        Login Now
      </motion.button>
      <button
        onClick={() => {
          setIsAlreadyRegistered(false);
          setOtpSent(false);
          setOtp(['', '', '', '', '', '']);
        }}
        className="text-gray-500 hover:text-gray-700 text-sm"
      >
        Use Different Number
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto w-full relative">
          {!registrationSuccess && step > 1 && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => setStep(prev => prev - 1)}
              className="absolute -left-4 top-4 p-2 text-gray-600 hover:text-gray-800 bg-white rounded-full shadow-lg"
            >
              <ChevronLeft size={24} />
            </motion.button>
          )}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8"
          >
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex justify-center mb-8"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <svg
                  className="w-12 h-12 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
            </motion.div>
  
            {/* Content Section */}
            {registrationSuccess ? (
              renderSuccessScreen()
            ) : isAlreadyRegistered ? (
              renderAlreadyRegisteredScreen()
            ) : (
              <>
                {step === 1 ? renderPhoneStep() : renderProfileStep()}
                
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-3 bg-red-50 border border-red-200 text-red-500 text-center rounded-lg"
                  >
                    {error}
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
  
          {/* Decorative Background Elements */}
          <div className="absolute -z-10 top-0 right-0 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
          <div className="absolute -z-10 bottom-0 left-0 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
          <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-4000"></div>
        </div>
      </div>
  
      {/* Animation Keyframes */}
      <style>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;