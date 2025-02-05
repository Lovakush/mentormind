// Chat.jsx
import { useState, useRef, useEffect } from 'react';
import WelcomeSection from '../components/features/WelcomeSection';
import ChatCard from '../components/features/ChatCard';
import ChatInput from '../components/features/ChatInput';
import ChatMessages from '../components/features/ChatMessages';
import { BookOpen, Target, Clock, BarChart2, Newspaper, Calculator, Brain, FileText } from 'lucide-react';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [streamingContent, setStreamingContent] = useState('');
    const [queries] = useState({ total: 10, remaining: 10 });
    const eventSourceRef = useRef(null);

  const quickActions = [
    {
      icon: "bookOpen",
      title: "Explain Topics",
      description: "Learn concepts & formulas",
      variant: "blue",
      prompt: "Explain in detail the concept of"
    },
    {
      icon: "target",
      title: "Practice MCQs",
      description: "Subject-wise questions",
      variant: "green",
      prompt: "Generate practice MCQs on"
    },
    {
      icon: "clock",
      title: "Study Plan",
      description: "Create schedule",
      variant: "purple",
      prompt: "Create a study plan for"
    },
    {
      icon: "barChart2",
      title: "Previous Years",
      description: "PYQ analysis & tips",
      variant: "orange",
      prompt: "Analyze previous year questions for"
    },
    {
      icon: "calculator",
      title: "Quick Math",
      description: "Shortcuts & tricks",
      variant: "red",
      prompt: "Show me quick tricks for solving"
    },
    {
      icon: "brain",
      title: "Reasoning",
      description: "Logic puzzles",
      variant: "indigo",
      prompt: "Practice questions on reasoning topic"
    },
    {
      icon: "fileText",
      title: "English",
      description: "Grammar & vocab",
      variant: "emerald",
      prompt: "Practice English questions on"
    },
    {
      icon: "newspaper",
      title: "Current GK",
      description: "Important updates",
      variant: "yellow",
      prompt: "Give me current affairs for SSC CGL on"
    }
  ];

    useEffect(() => {
      return () => {
          if (eventSourceRef.current) {
              eventSourceRef.current.close();
          }
      };
    }, []);

    const handleSendMessage = async (message) => {
      try {
          setIsLoading(true);
          setStreamingContent('');

          if (queries.remaining > 0) {
              queries.remaining -= 1;
          }

          // Add user message immediately
          setMessages(prev => [...prev, {
              role: 'user',
              content: message
          }]);

          // Close any existing EventSource
          if (eventSourceRef.current) {
              eventSourceRef.current.close();
          }

          // Create new EventSource for streaming
          const response = await fetch('http://localhost:8765/api/chat', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
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
                              // Update streaming content
                              accumulatedText += data.content;
                              setStreamingContent(accumulatedText);
                          } else if (data.type === 'final') {
                              // Add final formatted response
                              setMessages(prev => [...prev, {
                                  role: 'assistant',
                                  content: data.content
                              }]);
                              setStreamingContent('');
                          } else if (data.type === 'error') {
                              handleError(data.content);
                          }
                      } catch (e) {
                          console.error('Error parsing chunk:', e);
                      }
                  }
              }
          }

      } catch (error) {
          console.error('Error:', error);
          handleError('Sorry, I encountered an error. Please try again.');
      } finally {
          setIsLoading(false);
      }
  };

  const handleError = (errorMessage) => {
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: {
        type: 'text',
        subject: 'Error',
        content: {
          explanation: errorMessage
        }
      }
    }]);
  };

  // Handle quick action card clicks remains the same
  const handleQuickAction = (action) => {
    const defaultSubjects = {
      "Topic Explanation": "Percentage in Quantitative Aptitude",
      "Practice MCQs": "Time and Work",
      "Study Plan": "next 3 months SSC CGL preparation",
      "Previous Year": "Reasoning section",
      "Current Affairs": "last month important events",
      "Quant Practice": "Profit and Loss shortcuts",
      "Reasoning": "Blood Relations",
      "English Usage": "Spotting Errors"
    };

    const message = `${action.prompt} ${defaultSubjects[action.title]}`;
    handleSendMessage(message);
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      <div className="max-w-5xl mx-auto w-full px-4 sm:px-6">
        {/* Queries Counter */}
        <div className="flex justify-end mb-8 pt-6">
          <span className={`px-4 py-2 rounded-full text-sm ${
            queries.remaining === 0 
              ? 'bg-red-50 text-red-800' 
              : 'bg-amber-50 text-amber-800'
          }`}>
            {queries.remaining} / {queries.total} queries left today
          </span>
        </div>

        {/* Welcome Section */}
        {messages.length === 0 && <WelcomeSection username="Lova" />}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickActions.slice(0, 8).map((action, index) => (
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

        {/* Chat Messages with Streaming */}
        <ChatMessages 
          messages={messages}
          isLoading={isLoading}
          streamingContent={streamingContent}
        />
      </div>

      {/* Chat Input */}
      <ChatInput 
        onSendMessage={handleSendMessage}
        disabled={queries.remaining === 0}
        placeholder={
          queries.remaining === 0 
            ? "You've reached your daily query limit" 
            : "Ask anything about SSC CGL preparation..."
        }
      />
    </div>
  );
};

export default Chat;