import React, { useState } from 'react';
import type { EnhancedPromptResponse, Question } from '../types';
import { CopyIcon, CheckIcon, MagicWandIcon } from './Icons';
import { Questionnaire } from './Questionnaire';


interface ResultDisplayProps {
  result: EnhancedPromptResponse | null;
  isLoading: boolean;
  loadingMessage: string;
  error: string | null;
  isProMode: boolean;
  questions: Question[] | null;
  onQuestionnaireSubmit: (answeredQuestions: Question[]) => void;
}

const EnhancedPromptCard: React.FC<{ result: EnhancedPromptResponse }> = ({ result }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(result.enhancedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative h-full flex flex-col animate-fade-in">
      <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-purple-400 pr-12">{result.title}</h3>
          <button
            onClick={handleCopy}
            className="absolute top-0 right-0 p-2 bg-base-300/50 rounded-full hover:bg-brand-primary transition-colors text-text-secondary hover:text-white"
            title="Copy Enhanced Prompt"
          >
            {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
          </button>
      </div>
      <div className="flex-grow bg-base-100/70 p-4 rounded-lg overflow-y-auto border border-base-300/50">
        <pre className="text-text-primary whitespace-pre-wrap font-sans text-sm leading-relaxed">{result.enhancedPrompt}</pre>
      </div>
    </div>
  );
};


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, isLoading, loadingMessage, error, isProMode, questions, onQuestionnaireSubmit }) => {

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-text-secondary animate-fade-in">
            <div className="w-12 h-12 border-4 border-brand-secondary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-lg font-semibold">{loadingMessage || 'Loading...'}</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-full animate-fade-in">
            <div className="bg-red-900/50 border border-red-700 text-red-300 p-6 rounded-lg w-full text-center">
                <h3 className="font-bold text-lg">An Error Occurred</h3>
                <p className="mt-2">{error}</p>
            </div>
        </div>
      );
    }
    
    if (isProMode && questions) {
        return <Questionnaire questions={questions} onSubmit={onQuestionnaireSubmit} />;
    }

    if (result) {
      return <EnhancedPromptCard result={result} />;
    }
    
    // Placeholder view
    const title = isProMode ? "Pro Mode is Active" : "Your enhanced prompt will appear here.";
    const subtitle = isProMode 
      ? `Enter a prompt and our AI analyst will generate a questionnaire to refine your idea.` 
      : `Enter a prompt on the left and click "Enhance Prompt" to start.`;

    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-text-secondary/70 border-2 border-dashed border-base-300 rounded-lg">
            <MagicWandIcon className="w-16 h-16 mb-4 text-base-300" />
            <p className="text-lg font-semibold">{title}</p>
            <p className="text-sm max-w-xs mx-auto mt-1">{subtitle}</p>
        </div>
    );
  };

  return (
    <div className="bg-base-200/50 backdrop-blur-xl p-6 rounded-2xl border border-base-300/30 shadow-2xl shadow-black/20 flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4 text-text-primary">{isProMode ? "Pro Session" : "Enhanced Output"}</h2>
      <div className="flex-grow min-h-[450px] lg:min-h-0 relative">
        {renderContent()}
      </div>
    </div>
  );
};