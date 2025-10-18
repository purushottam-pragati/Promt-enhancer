import React, { useState } from 'react';
import type { EnhancedPromptResponse, Question, PromptVariant, StrategicVariants } from '../types';
import { CopyIcon, CheckIcon, MagicWandIcon } from './Icons';
import { Questionnaire } from './Questionnaire';
import { TransparencyLog } from './TransparencyLog';

interface ResultDisplayProps {
  result: EnhancedPromptResponse | null;
  isLoading: boolean;
  loadingMessage: string;
  error: string | null;
  isGuidedMode: boolean;
  questions: Question[] | null;
  onQuestionnaireSubmit: (answeredQuestions: Question[]) => void;
  originalPrompt: string;
}

type VariantKey = keyof StrategicVariants;

const VariantDisplay: React.FC<{ result: EnhancedPromptResponse, originalPrompt: string }> = ({ result, originalPrompt }) => {
  const [copied, setCopied] = useState(false);
  const [isJsonView, setIsJsonView] = useState(false);
  const [activeVariantKey, setActiveVariantKey] = useState<VariantKey>('directorsCut');

  const variants: [VariantKey, PromptVariant][] = [
    ['directorsCut', result.variants.directorsCut],
    ['maverick', result.variants.maverick],
    ['catalyst', result.variants.catalyst],
  ];

  const activeVariant = result.variants[activeVariantKey];

  const jsonOutput = JSON.stringify({
    originalRawPrompt: originalPrompt,
    enhancedOutput: activeVariant.enhancedPrompt,
  }, null, 2);

  const textToDisplay = isJsonView ? jsonOutput : activeVariant.enhancedPrompt;

  const handleCopy = () => {
    navigator.clipboard.writeText(textToDisplay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getVariantButtonClass = (key: VariantKey) => {
    const baseClass = "px-4 py-2 text-sm font-bold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-200 focus:ring-brand-secondary";
    if (key === activeVariantKey) {
      return `${baseClass} bg-brand-primary text-white shadow-md`;
    }
    return `${baseClass} bg-base-100/50 text-text-secondary hover:bg-base-100 hover:text-text-primary`;
  };

  return (
    <div className="relative h-full flex flex-col animate-fade-in">
        <div className="flex justify-between items-start mb-4">
            <div>
                 <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-purple-400 pr-12">{result.overallTitle}</h3>
                 <p className="text-sm text-text-secondary mt-1">Choose your strategic approach:</p>
            </div>
            <div className="absolute top-0 right-0 flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium transition-colors ${isJsonView ? 'text-text-primary' : 'text-text-secondary'}`}>JSON</span>
                    <button
                        type="button"
                        className={`${isJsonView ? 'bg-brand-primary' : 'bg-base-300'} relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-base-200`}
                        role="switch"
                        aria-checked={isJsonView}
                        onClick={() => setIsJsonView(!isJsonView)}
                        title="Format as JSON"
                    >
                        <span aria-hidden="true" className={`${isJsonView ? 'translate-x-4' : 'translate-x-0'} pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`} />
                    </button>
                </div>
                <button onClick={handleCopy} className="p-2 bg-base-300/50 rounded-full hover:bg-brand-primary transition-colors text-text-secondary hover:text-white" title="Copy Output">
                    {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <CopyIcon className="w-5 h-5" />}
                </button>
            </div>
        </div>

      <div className="flex items-center gap-2 mb-4">
        {variants.map(([key, variant]) => (
            <button key={key} onClick={() => setActiveVariantKey(key)} className={getVariantButtonClass(key)}>
                {variant.variantTitle}
            </button>
        ))}
      </div>

      <div className="flex-grow bg-base-100/70 rounded-lg border border-base-300/50 flex flex-col min-h-0">
        <div className="p-4 border-b border-base-300/50">
            <p className="text-sm text-text-secondary italic">{activeVariant.variantDescription}</p>
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
            <pre className="text-text-primary whitespace-pre-wrap font-sans text-sm leading-relaxed">{textToDisplay}</pre>
        </div>
      </div>

      {result.enhancementLog && <TransparencyLog log={result.enhancementLog} />}
    </div>
  );
};


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, isLoading, loadingMessage, error, isGuidedMode, questions, onQuestionnaireSubmit, originalPrompt }) => {

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
    
    if (isGuidedMode && questions) {
        return <Questionnaire questions={questions} onSubmit={onQuestionnaireSubmit} />;
    }

    if (result) {
      return <VariantDisplay result={result} originalPrompt={originalPrompt} />;
    }
    
    const title = isGuidedMode ? "Guided Enhancement is Active" : "Your strategic variants will appear here.";
    const subtitle = isGuidedMode 
      ? `Enter a prompt and our AI analyst will generate a questionnaire to refine your idea.` 
      : `Enter a prompt on the left and our AI Co-Pilot will generate three strategic options for you.`;

    return (
        <div className="flex flex-col items-center justify-center h-full text-center text-text-secondary/70 border-2 border-dashed border-base-300 rounded-lg p-4">
            <MagicWandIcon className="w-16 h-16 mb-4 text-base-300" />
            <p className="text-lg font-semibold">{title}</p>
            <p className="text-sm max-w-sm mx-auto mt-1">{subtitle}</p>
        </div>
    );
  };

  return (
    <div className="bg-base-200/50 backdrop-blur-xl p-6 rounded-2xl border border-base-300/30 shadow-2xl shadow-black/20 flex flex-col h-full">
      <h2 className="text-xl font-bold mb-4 text-text-primary">{isGuidedMode ? "Guided Session" : "Co-Pilot Output"}</h2>
      <div className="flex-grow min-h-[450px] lg:min-h-0 relative">
        {renderContent()}
      </div>
    </div>
  );
};
