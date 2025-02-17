import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOTP, verifyOTP, loginUser} from '../api/auth';
import DeviceLogoutModal from './DeviceLogoutModal';

const LoginPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isChecked, setIsChecked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(24);
  const [error, setError] = useState('');
  const [showRegisterPrompt, setShowRegisterPrompt] = useState(false);
  const [showDeviceLogoutModal, setShowDeviceLogoutModal] = useState(false);
  const [activeDeviceInfo, setActiveDeviceInfo] = useState('');
  const [pendingOTP, setPendingOTP] = useState('');

  useEffect(() => {
    let interval;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleSendOTP = async (e) => {
    e?.preventDefault();
    if (!phoneNumber || phoneNumber.length !== 10) {
      setError('Please enter a valid phone number');
      return;
    }

    setIsLoading(true);
    setError('');
    setShowRegisterPrompt(false); // Reset registration prompt when sending new OTP

    const response = await sendOTP(phoneNumber);
    
    if (response.success) {
      setOtpSent(true);
      setTimer(24);
    } else {
      setError(response.error);
    }
    
    setIsLoading(false);
  };

  const handleOTPChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);

    // Auto-focus next input
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }

    // If all digits are filled, verify OTP
    if (index === 5 && value && !newOTP.includes('')) {
      handleVerifyOTP(newOTP.join(''));
    }
  };

  // In LoginPage.js handleVerifyOTP function
  const handleVerifyOTP = async (otpValue) => {
    setIsLoading(true);
    setError('');
    setShowRegisterPrompt(false);
  
    try {

      const loginResponse = await loginUser(phoneNumber, otpValue);
  
      if (loginResponse.success) {
        // Store the token and user data
        const { access_token, expires_at, user } = loginResponse.data;
        localStorage.setItem('token', access_token);
        localStorage.setItem('expires_at', expires_at);
        localStorage.setItem('user', JSON.stringify(user));
        
        navigate('/chat');
      } else {
        if (loginResponse.error === 'User not found. Please register first.') {
          setShowRegisterPrompt(true);
        } else if (loginResponse.error === 'ACTIVE_SESSION_EXISTS' && loginResponse.deviceInfo) {
          // Show the device logout modal
          setActiveDeviceInfo(loginResponse.deviceInfo);
          setShowDeviceLogoutModal(true);
          setPendingOTP(otpValue);
        } else {
          setError(loginResponse.error || 'Login failed');
          setOtp(['', '', '', '', '', '']);
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to verify OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForceLogin = async () => {
    setIsLoading(true);
    try {
      const loginResponse = await loginUser(phoneNumber, pendingOTP, true); // true for force login
      
      if (loginResponse.success) {
        const { access_token, expires_at, user } = loginResponse.data;
        localStorage.setItem('token', access_token);
        localStorage.setItem('expires_at', expires_at);
        localStorage.setItem('user', JSON.stringify(user));
        
        navigate('/chat');
      } else {
        setError(loginResponse.error || 'Login failed');
        setOtp(['', '', '', '', '', '']);
      }
    } catch (error) {
      console.error('Force login error:', error);
      setError('Failed to login. Please try again.');
    } finally {
      setIsLoading(false);
      setShowDeviceLogoutModal(false);
      setPendingOTP('');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register', { 
      state: { 
        phoneNumber: `+91${phoneNumber}`,
        verifiedOTP: otp.join('') 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
        </div>
  
        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-4xl font-bold mb-2">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-orange-500 text-transparent bg-clip-text">
              AI Bharat India
            </span>
          </h1>
          <div className="flex justify-center items-center gap-2 mt-1">
            <span className="h-px w-8 bg-gradient-to-r from-blue-500 to-transparent"></span>
            <span className="text-orange-500">🔸</span>
            <span className="h-px w-8 bg-gradient-to-l from-orange-500 to-transparent"></span>
          </div>
        </div>
  
        {showRegisterPrompt ? (
          // Registration Prompt Screen
          <div className="text-center">
            <h2 className="text-lg sm:text-xl font-medium text-gray-900 mb-4">
              Registration Required
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't registered yet. Please create an account to continue.
            </p>
            <button
              onClick={handleRegisterClick}
              className="w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-4 text-sm sm:text-base"
            >
              Register Now
            </button>
            <button
              onClick={() => {
                setShowRegisterPrompt(false);
                setOtpSent(false);
                setOtp(['', '', '', '', '', '']);
              }}
              className="text-blue-500 hover:text-blue-600 text-sm sm:text-base"
            >
              Go Back
            </button>
          </div>
        ) : (
          // Login Flow
          <>
            <h2 className="text-center text-lg sm:text-xl font-medium text-gray-900 mb-4">
              Enter your phone number
            </h2>
  
            {!otpSent ? (
              <>
                <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
                  You'll receive an OTP for verification
                </p>
  
                <form onSubmit={handleSendOTP} className="space-y-6">
                  <div className="mb-4">
                    <div className="flex items-center w-full p-3 sm:p-4 border border-blue-200 rounded-lg bg-white">
                      <span className="text-gray-500 mr-2 text-sm sm:text-base">+91</span>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                        className="w-full outline-none text-gray-500 bg-transparent placeholder-gray-400 text-sm sm:text-base"
                        placeholder="Phone number"
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>
  
                  <div className="flex items-center">
                    <input
                      id="whatsapp-updates"
                      type="checkbox"
                      checked={isChecked}
                      onChange={(e) => setIsChecked(e.target.checked)}
                      className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="whatsapp-updates" className="ml-2 block text-sm text-gray-600">
                      Get targets and progress reports on WhatsApp
                    </label>
                  </div>
  
                  <button
                    type="submit"
                    disabled={isLoading || phoneNumber.length !== 10}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : 'Get OTP'}
                  </button>
                </form>
              </>
            ) : (
              <>
                <p className="text-center text-gray-600 mb-6 text-sm sm:text-base">
                  OTP sent to +91-{phoneNumber}{' '}
                  <button 
                    className="text-blue-500 hover:text-blue-600 ml-2"
                    onClick={() => setOtpSent(false)}
                  >
                    Edit
                  </button>
                </p>
  
                <div className="flex justify-center space-x-2 sm:space-x-3 mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value.replace(/\D/g, ''))}
                      className="w-10 h-10 sm:w-12 sm:h-12 text-center border border-gray-300 rounded-lg text-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      maxLength={1}
                      pattern="\d*"
                      inputMode="numeric"
                    />
                  ))}
                </div>
  
                <button
                  onClick={() => handleVerifyOTP(otp.join(''))}
                  disabled={isLoading || otp.includes('')}
                  className="w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4 text-sm sm:text-base"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>
  
                <div className="text-center mb-6">
                  <button
                    onClick={() => timer === 0 && handleSendOTP()}
                    disabled={timer > 0}
                    className="text-blue-500 hover:text-blue-600 disabled:text-gray-400 text-sm sm:text-base"
                  >
                    Resend OTP {timer > 0 ? `in ${timer}s` : ''}
                  </button>
                </div>
              </>
            )}
          </>
        )}
  
        {error && (
          <div className="mt-4 text-red-500 text-center text-sm sm:text-base">
            {error}
          </div>
        )}
  
        {/* Help Link */}
        <div className="mt-6 text-center">
          <span className="text-gray-600 text-xs sm:text-sm">Need help? </span>
          <a href="#" className="text-blue-500 text-xs sm:text-sm hover:text-blue-600">
            Contact us
          </a>
        </div>
  
        {/* Terms */}
        <div className="mt-4 text-center text-xs sm:text-sm text-gray-500">
          By continuing, you agree to our{' '}
          <a href="#" className="text-blue-500 hover:text-blue-600">
            Terms & Privacy Policy
          </a>
        </div>
      </div>
  
      {/* Custom Alert Dialog */}
      <DeviceLogoutModal 
        isOpen={showDeviceLogoutModal}
        onClose={() => {
          setShowDeviceLogoutModal(false);
          setPendingOTP('');
        }}
        onConfirm={handleForceLogin}
        deviceInfo={activeDeviceInfo}
      />
    </div>
  );
};

export default LoginPage;