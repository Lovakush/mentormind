import React from 'react';
import { AlertTriangle } from 'lucide-react';

const DeviceLogoutModal = ({ isOpen, onClose, onConfirm, deviceInfo }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-100 rounded-full">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Active Session Detected
            </h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              Your account is currently active on another device. Here are the details of the active session:
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Browser</span>
                <span className="font-medium text-gray-900">{deviceInfo?.browser || 'Unknown'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Operating System</span>
                <span className="font-medium text-gray-900">{deviceInfo?.os || 'Unknown'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Last Login</span>
                <span className="font-medium text-gray-900">{deviceInfo?.lastLoginTime || 'Unknown'}</span>
              </div>
            </div>

            <p className="text-gray-600">
              Would you like to log out from the other device and continue here? This will end the session on the other device immediately.
            </p>
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Continue Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceLogoutModal;