import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  CheckCircle,
  XCircle,
  Brain,
  ChevronRight
} from 'lucide-react';

const UniversalResponse = ({ content }) => {
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

  const parseContent = (rawContent) => {
    try {
      return typeof rawContent === 'string' ? JSON.parse(rawContent) : rawContent;
    } catch (error) {
      return rawContent;
    }
  };

  // MCQ Component
  const MCQComponent = ({ data }) => {
    const questions = data?.data?.questions || data?.questions || [];
    const totalQuestions = questions.length;
    
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState({ correct: 0, incorrect: 0, total: totalQuestions });

    const handleAnswer = (questionId, answerId) => {
      if (!showResults) {
        setAnswers(prev => ({ ...prev, [questionId]: answerId }));
      }
    };

    const calculateScore = () => {
      let correct = 0;
      let incorrect = 0;
      
      questions.forEach((question, idx) => {
        const qId = question.id || idx.toString();
        if (answers[qId]) {
          const userAnswer = answers[qId];
          const correctOptionIndex = String.fromCharCode(65).charCodeAt(0) + 
            question.options.findIndex(opt => opt === question.correct_answer);
          const correctAnswerId = String.fromCharCode(correctOptionIndex);
          
          if (userAnswer === correctAnswerId) {
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
      <div className="max-w-2xl mx-auto">
        <div className="space-y-4">
          {questions.map((question, idx) => {
            const questionId = question.id || idx.toString();
            const userAnswer = answers[questionId];
            const correctAnswer = question.correct_answer;
            const isAnswered = userAnswer !== undefined;
            const isCorrect = showResults && userAnswer === correctAnswer;
            const isWrong = showResults && userAnswer !== correctAnswer;

            return (
              <div key={idx} className="bg-white rounded-lg">
                <div className="mb-3 text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-blue-600 font-medium">Question {idx + 1}</span>
                  </div>
                  <p className="text-gray-900">{question.question}</p>
                </div>

                <div className="space-y-2">
                {Array.isArray(question.options) ? 
                    // Handle array format
                    question.options.map((option, optIdx) => {
                      // Use the option text directly as both ID and content
                      const optionId = String.fromCharCode(65 + optIdx);
                      const isSelected = userAnswer === optionId;
                      const isCorrectOption = question.correct_answer === option;

                      return (
                        <button
                          key={optionId}
                          onClick={() => handleAnswer(questionId, optionId)}
                          disabled={showResults}
                          className={`
                            w-full px-3 py-2 rounded-lg text-left text-sm
                            flex items-center gap-2 relative transition-colors
                            ${!showResults && isSelected ? 'bg-blue-50 border border-blue-200' : 'border border-gray-200'}
                            ${showResults && isCorrectOption ? 'bg-green-50 border border-green-500' : ''}
                            ${showResults && isSelected && !isCorrectOption ? 'bg-red-50 border border-red-500' : ''}
                            ${!isSelected && !showResults ? 'hover:bg-gray-50' : ''}
                          `}
                        >
                          <span className={`h-5 w-5 rounded-full flex items-center justify-center text-xs
                            ${showResults && isCorrectOption ? 'bg-green-100 text-green-700 border-green-500' : 
                            showResults && isSelected && !isCorrectOption ? 'bg-red-100 text-red-700 border-red-500' : 
                            'border border-current'}`}>
                            {optionId}
                          </span>
                          <span className="flex-1">{option}</span>
                          {showResults && (
                            isCorrectOption ? 
                              <CheckCircle className="w-4 h-4 text-green-500 absolute right-3" /> :
                              (isSelected && !isCorrectOption) ?
                                <XCircle className="w-4 h-4 text-red-500 absolute right-3" /> : null
                          )}
                        </button>
                      );
                    })
                    :
                    // Handle object format
                    Object.entries(question.options).map(([key, value], idx) => {
                      const optionId = key.toUpperCase();
                      const isSelected = userAnswer === optionId;
                      const isCorrectOption = correctAnswer?.toUpperCase() === optionId;

                      return (
                        <button
                          key={optionId}
                          onClick={() => handleAnswer(questionId, optionId)}
                          disabled={showResults}
                          className={`
                            w-full px-3 py-2 rounded-lg text-left text-sm
                            flex items-center gap-2 relative transition-colors
                            ${!showResults && isSelected ? 'bg-blue-50 border border-blue-200' : 'border border-gray-200'}
                            ${showResults && isCorrectOption ? 'bg-green-50 border border-green-500' : ''}
                            ${showResults && isSelected && !isCorrectOption ? 'bg-red-50 border border-red-500' : ''}
                            ${!isSelected && !showResults ? 'hover:bg-gray-50' : ''}
                          `}
                        >
                          <span className={`h-5 w-5 rounded-full flex items-center justify-center text-xs
                            ${showResults && isCorrectOption ? 'bg-green-100 text-green-700 border-green-500' : 
                            showResults && isSelected && !isCorrectOption ? 'bg-red-100 text-red-700 border-red-500' : 
                            'border border-current'}`}>
                            {optionId}
                          </span>
                          <span className="flex-1">{value}</span>
                          {showResults && (
                            isCorrectOption ? 
                              <CheckCircle className="w-4 h-4 text-green-500 absolute right-3" /> :
                              (isSelected && !isCorrectOption) ?
                                <XCircle className="w-4 h-4 text-red-500 absolute right-3" /> : null
                          )}
                        </button>
                      );
                    })
                  }
                </div>

                {showResults && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg text-sm">
                    <div className="text-blue-700 font-medium mb-1">
                      Correct Answer: {String.fromCharCode(65 + question.options.findIndex(opt => 
                        opt === question.correct_answer
                      ))}
                    </div>
                    {question.explanation && (
                      <div className="text-gray-700 mt-2">
                        <div className="font-medium mb-1">Explanation:</div>
                        {question.explanation}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 sticky bottom-0 bg-white py-3 border-t">
          {!showResults ? (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length === 0}
              className="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded-lg
                      hover:bg-blue-700 transition-colors
                      disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          ) : (
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-green-700">
                  <div className="font-medium">Correct</div>
                  <div className="text-lg font-bold">{score.correct}/{score.total}</div>
                </div>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <div className="text-red-700">
                  <div className="font-medium">Incorrect</div>
                  <div className="text-lg font-bold">{score.incorrect}/{score.total}</div>
                </div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-blue-700">
                  <div className="font-medium">Score</div>
                  <div className="text-lg font-bold">{score.percentage}%</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // General Content Component
const GeneralContent = ({ content }) => {
  const displayContent = (data) => {
    // For string content
    if (typeof data === 'string') {
      return <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{data}</div>;
    }

    // For parsed object content
    const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
    
    // Get the actual content, checking various possible fields
    const actualContent = parsedData?.data || 
                         parsedData?.content || 
                         parsedData?.response || 
                         parsedData?.explanation ||
                         parsedData?.answer ||
                         parsedData;

    // If content is array, display each item
    if (Array.isArray(actualContent)) {
      return actualContent.map((item, idx) => (
        <div key={idx} className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed mb-4">
          {typeof item === 'string' ? item : JSON.stringify(item)}
        </div>
      ));
    }

    // If content is object, get the relevant text content
    if (typeof actualContent === 'object' && actualContent !== null) {
      const textContent = Object.values(actualContent)
        .filter(value => typeof value === 'string')
        .join('\n\n');
      return <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{textContent}</div>;
    }

    // Fallback
    return <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
      {typeof actualContent === 'string' ? actualContent : JSON.stringify(actualContent)}
    </div>;
  };

  try {
    return displayContent(content);
  } catch (error) {
    return <div className="text-sm text-gray-700">{String(content)}</div>;
  }
};

  const parsedContent = parseContent(content);
  return isMCQType(parsedContent) ? (
    <MCQComponent data={parsedContent} />
  ) : (
    <GeneralContent content={parsedContent} />
  );
};

// Message Component
const Message = ({ role, content, isLoading, isStreaming }) => {
  const isAgent = role === 'assistant';
  
  return (
    <div className={`py-2 ${isAgent ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="max-w-2xl mx-auto px-3">
        <div className="flex gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
            isAgent ? 'bg-blue-600' : 'bg-emerald-600'
          }`}>
            {isAgent ? (
              <Brain className="w-4 h-4 text-white" />
            ) : (
              <span className="text-xs font-medium text-white">Y</span>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-600 mb-1">
              {isAgent ? 'AI Bharat India' : 'You'}
            </p>
            
            {isLoading ? (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                <span>Thinking...</span>
              </div>
            ) : (
              <div className="text-sm">
                {isStreaming ? (
                  <div className="whitespace-pre-wrap">
                    {content}
                    <span className="ml-1 animate-pulse">▋</span>
                  </div>
                ) : (
                  <UniversalResponse content={content} />
                )}
              </div>
            )}
          </div>
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