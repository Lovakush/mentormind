import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  CheckCircle,
  XCircle,
  Brain,
  ChevronRight
} from 'lucide-react';

// Universal Response Handler Component
const UniversalResponse = ({ content }) => {
  const [showExplanation, setShowExplanation] = useState({});

  // Helper to check if content is MCQ/Practice type
  const isMCQType = (content) => {
    if (!content) return false;
    try {
      const data = typeof content === 'string' ? JSON.parse(content) : content;
      return (data.type?.toLowerCase().includes('mcq') || 
             data.type?.toLowerCase().includes('practice') ||
             data.type?.toLowerCase().includes('quiz') ||
             data.type?.toLowerCase().includes('multiple_choice_questions')) &&
             (data.data?.questions || data.questions);
    } catch (error) {
      return false;
    }
  };
  // Helper to safely parse content
  const parseContent = (rawContent) => {
    try {
      return typeof rawContent === 'string' ? JSON.parse(rawContent) : rawContent;
    } catch (error) {
      return { type: 'text', data: rawContent };
    }
  };

  // MCQ/Practice Question Component
  const MCQComponent = ({ data }) => {
    // Get questions array from data structure
    const questions = data?.data?.questions || data?.questions || [];
    const totalQuestions = questions.length;
    
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState({ correct: 0, incorrect: 0, total: totalQuestions });
    const [showExplanation, setShowExplanation] = useState({});
  
    const handleAnswer = (questionId, answerId) => {
      if (!showResults) {
        setAnswers(prev => ({ ...prev, [questionId]: answerId }));
        setShowExplanation(prev => ({ ...prev, [questionId]: false }));
      }
    };
  
    const calculateScore = () => {
      let correct = 0;
      let incorrect = 0;
      
      questions.forEach((question, idx) => {
        const qId = question.id || idx.toString();
        if (answers[qId]) {
          if (answers[qId] === question.correct_answer) {
            correct++;
          } else {
            incorrect++;
          }
        }
      });
  
      return {
        correct,
        incorrect,
        total: totalQuestions,
        percentage: Math.round((correct / totalQuestions) * 100)
      };
    };
  
    const handleSubmit = () => {
      if (Object.keys(answers).length === 0) {
        alert("Please attempt at least one question before submitting.");
        return;
      }
      const results = calculateScore();
      setScore(results);
      setShowResults(true);
    };
  
    return (
      <div className="space-y-6 max-w-3xl mx-auto">
        {/* Test Header */}
        <div className="flex justify-between items-start gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex-1">
          <h3 className="text-xl font-medium text-gray-900">
            {data?.topic || 'Practice Test'}
          </h3>
          <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
            <span>Questions: {totalQuestions}</span>
            <span>•</span>
            <span>Time: {totalQuestions*3 || '15'} min</span>
          </div>
        </div>
        
        {/* Topic Card */}
        {data?.subject && (
          <div className="w-48 bg-blue-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-600 mb-1">Subject</h4>
            <p className="text-blue-700 font-medium">{data.subject}</p>
            {data.topic && (
              <>
                <h4 className="text-sm font-medium text-gray-600 mb-1 mt-3">Topic</h4>
                <p className="text-blue-700 font-medium">{data.topic}</p>
              </>
            )}
          </div>
        )}
        </div>
  
        {/* Questions */}
        <div className="space-y-6">
          {questions.map((question, idx) => (
            <div 
              key={idx} 
              className={`bg-white rounded-lg shadow-sm border ${
                showResults 
                  ? answers[question.id || idx.toString()] === question.correct_answer
                    ? 'border-green-200'
                    : 'border-red-200'
                  : 'border-gray-100'
              } overflow-hidden`}
            >
              <div className="p-6">
                {/* Question Header */}
                <div className="flex items-start gap-4 mb-6">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 font-medium mt-1">
                    {idx + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{question.question}</p>
                  </div>
                </div>
  
                {/* Options */}
                <div className="space-y-3 pl-12">
                  {(question.options || []).map((option, optIdx) => {
                    const optionId = option.id || String.fromCharCode(65 + optIdx);
                    const questionId = question.id || idx.toString();
                    return (
                      <button
                        key={optionId}
                        onClick={() => handleAnswer(questionId, optionId)}
                        disabled={showResults}
                        className={`w-full p-4 rounded-lg border text-left transition-all relative
                          ${showResults 
                            ? optionId === question.correct_answer
                              ? 'bg-green-50 border-green-200'
                              : answers[questionId] === optionId
                                ? 'bg-red-50 border-red-200'
                                : 'bg-white border-gray-200'
                            : answers[questionId] === optionId
                              ? 'bg-blue-50 border-blue-200'
                              : 'hover:bg-gray-50 border-gray-200'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full border flex items-center justify-center">
                            {optionId}
                          </span>
                          <span>{option.text || option}</span>
                          {showResults && (
                            optionId === question.correct_answer ? (
                              <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                            ) : answers[questionId] === optionId ? (
                              <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                            ) : null
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
  
                {/* Explanation */}
                {showResults && question.explanation && (
                  <div className="mt-4 pl-12">
                    <button
                      onClick={() => setShowExplanation(prev => ({
                        ...prev,
                        [question.id || idx.toString()]: !prev[question.id || idx.toString()]
                      }))}
                      className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-2"
                    >
                      {showExplanation[question.id || idx.toString()] ? 'Hide' : 'Show'} Explanation
                      <ChevronRight className={`w-4 h-4 transition-transform ${
                        showExplanation[question.id || idx.toString()] ? 'rotate-90' : ''
                      }`} />
                    </button>
                    {showExplanation[question.id || idx.toString()] && (
                      <div className="mt-3 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
                        {question.explanation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
  
        {/* Submit/Results Section */}
        {!showResults ? (
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                       transition-colors font-medium shadow-sm hover:shadow"
            >
              Submit Test
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-medium text-center mb-8">
                Test Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <ScoreCard 
                  title="Correct" 
                  value={score.correct} 
                  total={score.total}
                  variant="success" 
                />
                <ScoreCard 
                  title="Incorrect" 
                  value={score.incorrect} 
                  total={score.total}
                  variant="error" 
                />
                <ScoreCard 
                  title="Score" 
                  value={`${score.percentage}%`} 
                  variant="info" 
                />
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                           transition-colors font-medium shadow-sm hover:shadow"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  const ScoreCard = ({ title, value, total, variant }) => {
    const variants = {
      success: 'bg-green-50 text-green-700',
      error: 'bg-red-50 text-red-700',
      info: 'bg-blue-50 text-blue-700'
    };
  
    return (
      <div className={`p-6 rounded-lg ${variants[variant]}`}>
        <h4 className="text-sm font-medium mb-2">{title}</h4>
        <p className="text-3xl font-bold">
          {value}
          {total && <span className="text-lg font-medium opacity-75">/{total}</span>}
        </p>
      </div>
    );
  };
  
  const getOptionClassName = (option, question, answers, showResults) => {
    if (!showResults) {
      return answers[question.id] === option.id 
        ? 'bg-blue-50 border-blue-200' 
        : 'hover:bg-gray-50 border-gray-200';
    }
  
    if (option.id === question.correct_answer) {
      return 'bg-green-50 border-green-200';
    }
  
    if (answers[question.id] === option.id) {
      return 'bg-red-50 border-red-200';
    }
  
    return 'border-gray-200 opacity-60';
  };
  
  const getResultIcon = (option, question, answers) => {
    if (option.id === question.correct_answer) {
      return <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />;
    }
    if (answers[question.id] === option.id) {
      return <XCircle className="w-5 h-5 text-red-500 ml-auto" />;
    }
    return null;
  };

  // General Content Component
  const GeneralContent = ({ content }) => {
    const cleanContent = (data) => {
      if (!data) return null;
      
      // Remove unnecessary fields
      const fieldsToRemove = [
        'metadata', 'timestamp', 'grade_level', 'query_type', 
        'type', 'is_educational', 'response_type'
      ];
      
      if (typeof data === 'object' && !Array.isArray(data)) {
        const cleaned = { ...data };
        fieldsToRemove.forEach(field => delete cleaned[field]);
        // Move subject and topic to top if they exist
        if (cleaned.subject || cleaned.topic) {
          const { subject, topic, ...rest } = cleaned;
          return { subject, topic, ...rest };
        }
        return cleaned;
      }
      return data;
    };
  
    const renderContent = (data) => {
      const cleanedData = cleanContent(data);
      if (!cleanedData) return null;
  
      if (typeof cleanedData === 'string') {
        return <p className="text-gray-700 whitespace-pre-wrap">{cleanedData}</p>;
      }
  
      if (Array.isArray(cleanedData)) {
        return (
          <ul className="space-y-3">
            {cleanedData.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </div>
                <div className="flex-1">{renderContent(item)}</div>
              </li>
            ))}
          </ul>
        );
      }
  
      if (typeof cleanedData === 'object') {
        // Special handling for subject and topic
        const { subject, topic, ...restData } = cleanedData;
        return (
          <div className="space-y-6">
            {(subject || topic) && (
              <div className="flex gap-4 mb-6">
                {subject && (
                  <div className="bg-blue-50 px-4 py-2 rounded-lg">
                    <span className="text-sm text-gray-600">Subject:</span>
                    <span className="ml-2 font-medium text-blue-700">{subject}</span>
                  </div>
                )}
                {topic && (
                  <div className="bg-purple-50 px-4 py-2 rounded-lg">
                    <span className="text-sm text-gray-600">Topic:</span>
                    <span className="ml-2 font-medium text-purple-700">{topic}</span>
                  </div>
                )}
              </div>
            )}
            
            {Object.entries(restData).map(([key, value]) => {
              if (value == null) return null;
              
              const title = key.split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
  
              return (
                <div key={key} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                      {title}
                    </h4>
                    <div className="prose prose-blue max-w-none">
                      {renderContent(value)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      }
  
      return String(cleanedData);
    };
  
    return (
      <div className="space-y-6">
        {renderContent(content)}
      </div>
    );
  };

  try {
    const parsedContent = parseContent(content);
    return isMCQType(parsedContent) ? (
      <MCQComponent data={parsedContent} />
    ) : (
      <GeneralContent content={parsedContent} />
    );
  } catch (error) {
    console.error('Error rendering content:', error);
    return (
      <div className="bg-red-50 rounded-lg p-4 text-red-700">
        Error displaying content. Please try again.
      </div>
    );
  }
};

// Message Component
const Message = ({ role, content, isLoading, isStreaming }) => {
  const isAgent = role === 'assistant';
  
  return (
    <div className={`py-4 ${isAgent ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 flex gap-4">
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isAgent ? 'bg-blue-600' : 'bg-emerald-600'
        }`}>
          {isAgent ? (
            <Brain className="w-5 h-5 text-white" />
          ) : (
            <span className="text-sm font-medium text-white">Y</span>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 space-y-2">
        <p className="font-medium text-sm text-gray-600">
          {isAgent ? 'AI MentorMind' : 'You'}
        </p>
          
          {isLoading ? (
            <div className="flex items-center gap-2 text-gray-500">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
              <span>Thinking...</span>
            </div>
          ) : isStreaming ? (
            <div className="prose prose-slate max-w-none">
              <div className="whitespace-pre-wrap">
                {content}
                <span className="ml-1 animate-pulse">▋</span>
              </div>
            </div>
          ) : (
            <UniversalResponse content={content} />
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

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, index) => (
        <Message
          key={index}
          role={message.role}
          content={message.content}
          isLoading={false}
          isStreaming={false}
        />
      ))}
      
      {streamingContent && (
        <Message
          role="assistant"
          content={streamingContent}
          isLoading={false}
          isStreaming={true}
        />
      )}
      
      {isLoading && !streamingContent && (
        <Message
          role="assistant"
          content=""
          isLoading={true}
          isStreaming={false}
        />
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;