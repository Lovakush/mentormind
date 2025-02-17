import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/layouts/Sidebar';
import WelcomeSection from '../components/features/WelcomeSection';
import ChatCard from '../components/features/ChatCard';
import ChatInput from '../components/features/ChatInput';
import ChatMessages from '../components/features/ChatMessages';
import { BookOpen, Target, Clock, Calculator, Brain, FileText } from 'lucide-react';
import { AI_BACKEND } from '../../constants';
import useAuthCheck from '../hooks/useAuthCheck';


const Chat = () => {
  useAuthCheck();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const [queries] = useState({ total: 10, remaining: 10 });
  const eventSourceRef = useRef(null);
  const inputRef = useRef(null);
  const [inputMessage, setInputMessage] = useState('');

  const quickActions = [
    {
      icon: "bookOpen",
      title: "Learn Concepts",
      description: "Get detailed explanations of any topic",
      variant: "blue",
      prompt: "Explain"
    },
    {
      icon: "target",
      title: "Practice Tests",
      description: "MCQs and question practice",
      variant: "green",
      prompt: "Give me MCQs on"
    },
    {
      icon: "brain",
      title: "Visual Learning",
      description: "Mind maps & visual aids",
      variant: "purple",
      prompt: "Create mind map for"
    },
    {
      icon: "calculator",
      title: "Solve Questions",
      description: "Step-by-step solutions",
      variant: "red",
      prompt: "Help me solve"
    }
  ];
  const handleSendMessage = async (message) => {
    try {
      setIsLoading(true);
      setStreamingContent('');
      if (queries.remaining > 0) queries.remaining -= 1;
      
      setMessages(prev => [...prev, { role: 'user', content: message }]);
      const response = await fetch(`${AI_BACKEND}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: message })
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === 'chunk') {
                accumulatedText += data.content;
                setStreamingContent(accumulatedText);
              } else if (data.type === 'final') {
                setMessages(prev => [...prev, {
                  role: 'assistant',
                  content: data.content
                }]);
                setStreamingContent('');
              }
            } catch (e) {
              console.error('Error parsing chunk:', e);
            }
          }
        }
      }
    } catch (error) {
      handleError('Sorry, I encountered an error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (errorMessage) => {
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: {
        type: 'error',
        content: errorMessage
      }
    }]);
  };

  const handleQuickAction = (action) => {
    const subjects = {
      "Learn Concepts": "polynomial equations",
      "Practice Tests": "chemical reactions",
      "Visual Learning": "parts of speech",
      "Solve Questions": "surface area and volume"
    };
    // Instead of handleSendMessage, set the input value:
    const inputElement = document.querySelector('input[type="text"]');
    if (inputElement) {
      inputElement.value = `${action.prompt} ${subjects[action.title]}`;
      inputElement.focus();
    }
  };


  return (
    <div className="flex h-screen overflow-hidden">
    <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    
    <main className={`flex-1 flex flex-col relative transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-16'}`}>
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex justify-end mb-6">
              <span className={`px-4 py-2 rounded-full text-sm ${
                queries.remaining === 0 ? 'bg-red-50 text-red-800' : 'bg-amber-50 text-amber-800'
              }`}>
                {queries.remaining} / {queries.total} queries left
              </span>
            </div>

            {messages.length === 0 && (
              <>
                <WelcomeSection username="Student" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {quickActions.map((action, index) => (
                    <ChatCard 
                      key={index}
                      icon={action.icon}
                      title={action.title}
                      description={action.description}
                      variant={action.variant}
                      onClick={() => handleQuickAction(action)}
                    />
                  ))}
                </div>
              </>
            )}

            <ChatMessages 
              messages={messages}
              isLoading={isLoading}
              streamingContent={streamingContent}
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white border-t">
          <ChatInput 
            onSendMessage={handleSendMessage}
            disabled={queries.remaining === 0}
            placeholder={queries.remaining === 0 
              ? "You've reached your daily limit" 
              : "Ask any question about your studies..."}
            message={inputMessage}
            setMessage={setInputMessage}
          />
        </div>
      </main>
    </div>
  );
};

export default Chat;