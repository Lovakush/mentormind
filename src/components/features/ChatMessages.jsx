import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  MessageSquare, 
  ChevronRight, 
  BookOpen, 
  Target, 
  Brain, 
  Calendar,
  Loader2 
} from 'lucide-react';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 rounded-lg p-4">
          <p className="text-red-700">Something went wrong displaying this message.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

// Topic Explanation Component
const ExplanationResponse = ({ data }) => {
  const [expandedConcept, setExpandedConcept] = useState(null);
  
  if (!data.content) return (
    <div className="bg-red-50 rounded-lg p-4">
      <p className="text-red-700">Missing content in explanation</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-blue-600">
        <BookOpen className="w-5 h-5" />
        <h3 className="font-medium text-lg">{data.topic || 'Topic Explanation'}</h3>
      </div>

      <div className="prose prose-slate max-w-none">
        <p>{data.content.introduction || data.content.explanation}</p>
      </div>

      {data.content.key_concepts?.map((concept, idx) => (
        <div key={idx} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <button
            onClick={() => setExpandedConcept(expandedConcept === idx ? null : idx)}
            className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
          >
            <span className="font-medium text-gray-900">{concept.title}</span>
            <ChevronRight className={`w-5 h-5 transition-transform ${expandedConcept === idx ? 'rotate-90' : ''}`} />
          </button>
          
          {expandedConcept === idx && (
            <div className="p-4 space-y-4">
              <p className="text-gray-700">{concept.explanation}</p>
              
              {concept.examples?.length > 0 && (
                <div className="bg-blue-50 p-3 rounded">
                  <h4 className="font-medium mb-2">Examples:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {concept.examples.map((ex, i) => <li key={i}>{ex}</li>)}
                  </ul>
                </div>
              )}
              
              {concept.formulas?.length > 0 && (
                <div className="bg-purple-50 p-3 rounded">
                  <h4 className="font-medium mb-2">Key Formulas:</h4>
                  {concept.formulas.map((formula, i) => (
                    <div key={i} className="font-mono text-sm bg-white p-2 rounded mb-2">{formula}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Tips and Common Mistakes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.content.tips?.length > 0 && (
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Pro Tips:</h4>
            <ul className="list-disc list-inside space-y-1">
              {data.content.tips.map((tip, idx) => <li key={idx}>{tip}</li>)}
            </ul>
          </div>
        )}

        {data.content.common_mistakes?.length > 0 && (
          <div className="bg-red-50 rounded-lg p-4">
            <h4 className="font-medium mb-2">Common Mistakes:</h4>
            <ul className="list-disc list-inside space-y-1">
              {data.content.common_mistakes.map((mistake, idx) => <li key={idx}>{mistake}</li>)}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Practice Question Component
const PracticeResponse = ({ data }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  if (!data.questions?.length) return (
    <div className="bg-red-50 rounded-lg p-4">
      <p className="text-red-700">No questions available</p>
    </div>
  );

  const handleAnswerSelect = (questionId, answerId) => {
    if (!showResults) {
      setSelectedAnswers(prev => ({ ...prev, [questionId]: answerId }));
    }
  };

  const getScore = () => {
    if (!showResults) return 0;
    return data.questions.reduce((score, q) => 
      score + (selectedAnswers[q.id] === q.correctAnswer ? 1 : 0), 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-green-600">
        <Target className="w-5 h-5" />
        <h3 className="font-medium text-lg">{data.topic || 'Practice Questions'}</h3>
      </div>

      {data.questions.map((question, idx) => (
        <div key={idx} className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
          <div className="flex justify-between items-start">
            <span className="font-medium">Question {idx + 1}</span>
            {showResults && (
              <span className={`text-sm px-2 py-1 rounded ${
                selectedAnswers[question.id] === question.correctAnswer
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {selectedAnswers[question.id] === question.correctAnswer ? 'Correct' : 'Incorrect'}
              </span>
            )}
          </div>

          <p className="text-gray-900">{question.question}</p>

          <div className="space-y-2">
            {question.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(question.id, option.id)}
                disabled={showResults}
                className={`w-full p-3 rounded-lg border text-left transition-colors ${
                  showResults
                    ? option.id === question.correctAnswer
                      ? 'bg-green-50 border-green-200'
                      : selectedAnswers[question.id] === option.id
                      ? 'bg-red-50 border-red-200'
                      : 'bg-gray-50 border-gray-200'
                    : selectedAnswers[question.id] === option.id
                    ? 'bg-blue-50 border-blue-200'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                {option.id}. {option.text}
              </button>
            ))}
          </div>

          {showResults && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="font-medium text-sm mb-2">Explanation:</p>
              <p className="text-gray-700 text-sm">{question.explanation}</p>
            </div>
          )}
        </div>
      ))}

      {!showResults ? (
        <button
          onClick={() => setShowResults(true)}
          disabled={Object.keys(selectedAnswers).length !== data.questions.length}
          className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium
            disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700"
        >
          Submit Answers
        </button>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="font-medium text-lg mb-2">Your Score</h4>
          <p className="text-gray-700">
            You got {getScore()} out of {data.questions.length} questions correct!
          </p>
        </div>
      )}
    </div>
  );
};

// Content Type Renderer
const ResponseRenderer = ({ data, isStreaming = false }) => {
  // Handle streaming content
  if (isStreaming) {
    return (
      <div className="prose prose-slate max-w-none">
        <div className="whitespace-pre-wrap">
          {data}
          <span className="animate-pulse ml-1">▋</span>
        </div>
      </div>
    );
  }

  // Handle string content
  if (typeof data === 'string') {
    return (
      <div className="prose prose-slate max-w-none">
        <p className="text-gray-700">{data}</p>
      </div>
    );
  }

  // Handle invalid data
  if (!data || typeof data !== 'object') {
    return (
      <div className="bg-red-50 rounded-lg p-4">
        <p className="text-red-700">Invalid response format</p>
      </div>
    );
  }

  const components = {
    explanation: ExplanationResponse,
    practice: PracticeResponse
  };

  const Component = components[data.type];

  if (!Component) {
    return (
      <div className="prose prose-slate max-w-none">
        <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-sm">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Component data={data} />
    </ErrorBoundary>
  );
};

// Message Component
const Message = ({ role, content, isLoading, isStreaming }) => {
  const isAgent = role === 'assistant';
  
  return (
    <div className={`py-8 ${isAgent ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 flex gap-4 sm:gap-6">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isAgent ? 'bg-blue-600' : 'bg-emerald-600'
        }`}>
          {isAgent ? (
            <MessageSquare className="w-5 h-5 text-white" />
          ) : (
            <span className="text-sm font-medium text-white">U</span>
          )}
        </div>
        
        <div className="flex-1 space-y-2 overflow-hidden">
          <p className="font-medium text-sm text-gray-600">
            {isAgent ? 'SSC Agent' : 'You'}
          </p>
          {isLoading ? (
            <div className="flex items-center gap-2 text-gray-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Generating response...</span>
            </div>
          ) : (
            <ResponseRenderer data={content} isStreaming={isStreaming} />
          )}
        </div>
      </div>
    </div>
  );
};

// Main ChatMessages Component
const ChatMessages = ({ messages = [], isLoading = false, streamingContent = '' }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  // Handle empty state
  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto">
        <div className="h-full flex items-center justify-center">
          <div className="text-center space-y-3 max-w-xl mx-auto px-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Welcome to SSC CGL Preparation Assistant
            </h2>
            <p className="text-gray-600">
              Ask me anything about SSC CGL exam preparation. I can help you with
              concepts, practice questions, current affairs, and preparation strategies.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, index) => (
        <Message
          key={index}
          role={message.role}
          content={message.content}
          isLoading={false}
        />
      ))}
      
      {/* Streaming Content */}
      {streamingContent && (
        <Message
          role="assistant"
          content={streamingContent}
          isStreaming={true}
        />
      )}
      
      {/* Loading State */}
      {isLoading && !streamingContent && (
        <Message
          role="assistant"
          content=""
          isLoading={true}
        />
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;