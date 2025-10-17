import React from 'react';
import { EnhanceIcon, LoadingSpinner } from './Icons';

interface PromptInputProps {
  originalPrompt: string;
  setOriginalPrompt: (prompt: string) => void;
  onEnhance: () => void;
  isLoading: boolean;
  isQuestionnaireActive: boolean;
  isProMode: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ originalPrompt, setOriginalPrompt, onEnhance, isLoading, isQuestionnaireActive, isProMode }) => {
  
  const isDisabled = isLoading || !originalPrompt || isQuestionnaireActive;
  const buttonText = isProMode ? 'Start Pro Session' : 'Enhance Prompt';

  return (
    <div className={`bg-base-200/50 backdrop-blur-xl p-6 rounded-2xl border border-base-300/30 shadow-2xl shadow-black/20 flex flex-col h-full transition-opacity duration-300 ${isQuestionnaireActive ? 'opacity-50' : 'opacity-100'}`}>
      <h2 className="text-xl font-bold mb-4 text-text-primary">Your Prompt</h2>
      <textarea
        className="w-full flex-grow p-4 bg-base-100/70 border border-base-300/50 rounded-lg resize-none focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary transition duration-200 text-text-primary placeholder-text-secondary disabled:opacity-70 disabled:cursor-not-allowed"
        placeholder="e.g., write a story about a cat"
        value={originalPrompt}
        onChange={(e) => setOriginalPrompt(e.target.value)}
        rows={15}
        disabled={isQuestionnaireActive}
      />
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