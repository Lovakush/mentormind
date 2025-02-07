import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ onSendMessage, disabled, placeholder, message, setMessage }) => {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message?.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  // Focus input when message prop changes (for quick actions)
  useEffect(() => {
    if (message && inputRef.current) {
      inputRef.current.focus();
    }
  }, [message]);

  return (
    <div className="w-full bg-white">
    <div className="max-w-3xl mx-auto px-4 py-4"> {/* Changed padding */}
      <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={message || ''}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={placeholder || "Ask anything about your studies (Class 8-12)..."}
              disabled={disabled}
              className={`
                w-full px-4 py-3
                bg-white border border-gray-200 
                rounded-lg
                pr-12
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                shadow-lg
                text-base
                placeholder-gray-500
                disabled:bg-gray-50 disabled:text-gray-400
                disabled:cursor-not-allowed
              `}
            />
            {!disabled && message?.trim() && (
              <button
                type="submit"
                className="absolute right-2 text-blue-600 hover:text-blue-700 p-1.5 rounded-full 
                         hover:bg-blue-50 transition-colors active:bg-blue-100"
                aria-label="Send message"
              >
                <Send className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Character limit indicator - optional */}
          {message?.length > 0 && (
            <div className="absolute right-14 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              {message.length}/2000
            </div>
          )}

          {disabled && (
            <div className="absolute -top-6 left-0 right-0 text-center">
              <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm">
                You've reached your daily limit
              </span>
            </div>
          )}
      </form>
      </div>
    </div>
  );
};

export default ChatInput;