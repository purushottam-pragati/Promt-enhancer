import React, { useState, useEffect, useRef } from 'react';
import { EnhanceIcon, LoadingSpinner, InfoIcon, CheckIcon, CloseIcon } from './Icons';
import { getPromptFeedback } from '../services/geminiService';
import type { PromptFeedback } from '../types';

interface PromptInputProps {
  originalPrompt: string;
  setOriginalPrompt: (prompt: string) => void;
  onEnhance: () => void;
  isLoading: boolean;
  isQuestionnaireActive: boolean;
  isGuidedMode: boolean;
}

const AssistantPopover: React.FC<{feedback: PromptFeedback, onClose: () => void}> = ({ feedback, onClose }) => (
    <div className="absolute top-12 right-0 w-80 bg-base-300/80 backdrop-blur-lg p-4 rounded-xl border border-base-300/50 shadow-2xl z-20 animate-fade-in text-left">
        <div className="flex justify-between items-center mb-3">
            <h4 className="font-bold text-text-primary">Prompting Assistant</h4>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-base-100/50">
                <CloseIcon className="w-5 h-5" />
            </button>
        </div>
        
        {feedback.strengths.length > 0 && (
            <div className="mb-3">
                <h5 className="text-sm font-semibold text-green-400 mb-1">Strengths</h5>
                <ul className="list-none space-y-1">
                    {feedback.strengths.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-text-primary">
                            <CheckIcon className="w-3 h-3 mt-0.5 flex-shrink-0 text-green-400"/>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        )}
        
        {feedback.suggestions.length > 0 && (
            <div>
                <h5 className="text-sm font-semibold text-yellow-400 mb-1">Suggestions</h5>
                <ul className="list-none space-y-1">
                    {feedback.suggestions.map((item, i) => (
                         <li key={i} className="flex items-start gap-2 text-xs text-text-primary">
                             <span className="mt-0.5 flex-shrink-0">💡</span>
                             <span>{item}</span>
                         </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
);


export const PromptInput: React.FC<PromptInputProps> = ({ originalPrompt, setOriginalPrompt, onEnhance, isLoading, isQuestionnaireActive, isGuidedMode }) => {
  
  const isDisabled = isLoading || !originalPrompt || isQuestionnaireActive;
  const buttonText = isGuidedMode ? 'Start Guided Session' : 'Enhance Prompt';

  const [feedback, setFeedback] = useState<PromptFeedback | null>(null);
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);
  const [isAssistantVisible, setIsAssistantVisible] = useState(false);
  const debounceTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    
    if (isQuestionnaireActive) {
      setFeedback(null);
      return;
    }

    if (originalPrompt.trim().length > 15) {
      setIsFeedbackLoading(true);
      debounceTimeoutRef.current = window.setTimeout(async () => {
        try {
          const newFeedback = await getPromptFeedback(originalPrompt);
          setFeedback(newFeedback);
        } catch (error) {
          console.error("Error fetching prompt feedback:", error);
          setFeedback(null);
        } finally {
          setIsFeedbackLoading(false);
        }
      }, 1000);
    } else {
      setFeedback(null);
      setIsFeedbackLoading(false);
    }

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [originalPrompt, isQuestionnaireActive]);

  const getQualityColor = () => {
    if (!feedback) return 'bg-base-300';
    switch (feedback.overallRating) {
      case 'Good': return 'bg-green-500';
      case 'Average': return 'bg-yellow-500';
      case 'Poor': return 'bg-red-500';
      default: return 'bg-base-300';
    }
  };

  const getQualityWidth = () => {
    if (!feedback) return '0%';
    switch (feedback.overallRating) {
      case 'Good': return '100%';
      case 'Average': return '66%';
      case 'Poor': return '33%';
      default: return '0%';
    }
  };

  return (
    <div className={`bg-base-200/50 backdrop-blur-xl p-6 rounded-2xl border border-base-300/30 shadow-2xl shadow-black/20 flex flex-col h-full transition-opacity duration-300 ${isQuestionnaireActive ? 'opacity-50' : 'opacity-100'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-text-primary">Your Prompt</h2>
        <div className="relative">
          {feedback && !isQuestionnaireActive && (
             <button
                onClick={() => setIsAssistantVisible(!isAssistantVisible)}
                className="p-2 rounded-full hover:bg-base-100/50 transition-colors"
                title="Prompt Assistant"
             >
                <InfoIcon className="w-6 h-6 text-brand-secondary"/>
            </button>
          )}
          {isAssistantVisible && feedback && <AssistantPopover feedback={feedback} onClose={() => setIsAssistantVisible(false)} />}
        </div>
      </div>
      <div className="relative flex-grow flex flex-col">
        <textarea
          className="w-full flex-grow p-4 bg-base-100/70 border border-base-300/50 rounded-lg resize-none focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary transition duration-200 text-text-primary placeholder-text-secondary disabled:opacity-70 disabled:cursor-not-allowed"
          placeholder="e.g., write a story about a cat"
          value={originalPrompt}
          onChange={(e) => setOriginalPrompt(e.target.value)}
          rows={15}
          disabled={isQuestionnaireActive}
        />
        {/* Quality Indicator */}
        <div className={`absolute bottom-3 left-3 right-3 transition-opacity duration-300 ${feedback || isFeedbackLoading ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center justify-between text-xs px-1 mb-1">
                <span className="font-semibold text-text-secondary">Prompt Quality</span>
                {isFeedbackLoading && <span className="text-text-secondary">Analyzing...</span>}
            </div>
            <div className="w-full bg-base-100/50 rounded-full h-1.5">
                <div 
                    className={`h-1.5 rounded-full transition-all duration-500 ${getQualityColor()}`}
                    style={{ width: getQualityWidth() }}
                ></div>
            </div>
        </div>
      </div>
      <button
        onClick={onEnhance}
        disabled={isDisabled}
        className="mt-6 w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-brand-secondary/50 transition-all duration-300 transform hover:scale-[1.02] disabled:bg-gradient-to-br disabled:from-base-300 disabled:to-base-200 disabled:text-text-secondary disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100"
      >
        {isLoading && !isQuestionnaireActive ? (
          <>
            <LoadingSpinner className="w-6 h-6" />
            Processing...
          </>
        ) : (
          <>
            <EnhanceIcon className="w-6 h-6" />
            {isQuestionnaireActive ? 'Questionnaire Active' : buttonText}
          </>
        )}
      </button>
    </div>
  );
};
