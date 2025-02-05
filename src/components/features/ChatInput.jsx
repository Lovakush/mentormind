import { useState } from 'react';
import { PlusCircle, Send, FileText, Newspaper, Brain } from 'lucide-react';

const suggestedOptions = [
  {
    icon: FileText,
    label: 'Generate Quant MCQs'
  },
  {
    icon: Brain,
    label: 'Practice Reasoning'
  },
  {
    icon: Newspaper,
    label: 'Current Affairs Update'
  }
];

const ChatInput = ({ onSendMessage, disabled, placeholder }) => {
  const [message, setMessage] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      setShowSuggestions(false);
    }
  };

  const handlePlusClick = () => {
    if (!disabled) {
      setShowSuggestions(!showSuggestions);
      setIsInputFocused(true);
    }
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50">
      <div className="max-w-3xl mx-auto px-4">
        {/* Suggestions Popover */}
        {showSuggestions && (
          <div className="absolute bottom-full mb-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
            {suggestedOptions.map((option, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 border-b last:border-b-0 border-gray-100"
                onClick={() => {
                  setMessage(option.label);
                  setShowSuggestions(false);
                }}
              >
                <option.icon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{option.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onFocus={() => setIsInputFocused(true)}
              placeholder={placeholder || "Ask me anything about SSC CGL..."}
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
                ${disabled ? 'bg-gray-50 text-gray-400' : ''}
              `}
            />
            {!disabled && (
              !message.trim() ? (
                <button
                  type="button"
                  onClick={handlePlusClick}
                  className="
                    absolute right-2
                    text-blue-600 hover:text-blue-700
                    p-1.5
                    rounded-full
                    hover:bg-blue-50
                  "
                >
                  <PlusCircle className="w-6 h-6" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="
                    absolute right-2
                    text-blue-600 hover:text-blue-700
                    p-1.5
                    rounded-full
                    hover:bg-blue-50
                  "
                >
                  <Send className="w-6 h-6" />
                </button>
              )
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;