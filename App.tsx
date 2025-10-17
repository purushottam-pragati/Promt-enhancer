import React, { useState, useCallback, useRef } from 'react';
import { PromptInput } from './components/PromptInput';
import { ResultDisplay } from './components/ResultDisplay';
import { Examples } from './components/Examples';
import { enhancePrompt as enhancePromptApi, generateClarificationQuestions } from './services/geminiService';
import type { EnhancedPromptResponse, Question } from './types';
import { EnhanceIcon, ProIcon } from './components/Icons';
import { examplesData } from './data/examples';
import { ToggleSwitch } from './components/ToggleSwitch';

const App: React.FC = () => {
  const [originalPrompt, setOriginalPrompt] = useState<string>('');
  const [enhancedResult, setEnhancedResult] = useState<EnhancedPromptResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isProMode, setIsProMode] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  
  const resultRef = useRef<HTMLDivElement>(null);

  const resetState = () => {
    setIsLoading(false);
    setLoadingMessage('');
    setError(null);
    setEnhancedResult(null);
    setQuestions(null);
    setOriginalPrompt('');
  }

  const handleEnhance = useCallback(async (promptToEnhance: string) => {
    if (!promptToEnhance.trim()) {
      setError("Please enter a prompt to enhance.");
      return;
    }
    // Reset everything except the original prompt in the input box
    setError(null);
    setEnhancedResult(null);
    setQuestions(null);
    setOriginalPrompt(promptToEnhance);
    setIsLoading(true);

    if (window.innerWidth < 1024 && resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (isProMode) {
      setLoadingMessage("AI is analyzing your prompt and generating clarifying questions...");
      try {
        const generatedQuestions = await generateClarificationQuestions(promptToEnhance);
        if (generatedQuestions.length === 0) {
          // If the AI needs no clarification, just enhance it directly.
          setLoadingMessage("No clarifications needed. Proceeding to enhance...");
          const result = await enhancePromptApi(promptToEnhance);
          setEnhancedResult(result);
        } else {
          setQuestions(generatedQuestions.map((q, index) => ({ ...q, id: index })));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred while generating questions.");
      } finally {
        setIsLoading(false);
        setLoadingMessage('');
      }
    } else {
      setLoadingMessage("Our AI is working its magic to enhance your prompt...");
      try {
        const result = await enhancePromptApi(promptToEnhance);
        setEnhancedResult(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setIsLoading(false);
        setLoadingMessage('');
      }
    }
  }, [isProMode]);

  const handleQuestionnaireSubmit = async (answeredQuestions: Question[]) => {
      setIsLoading(true);
      setLoadingMessage("Synthesizing your answers and crafting the final prompt...");
      setQuestions(null); // Hide questionnaire while processing
      
      // Create a detailed brief from the user's input and answers.
      // This brief will be the input for our standard prompt enhancer.
      let detailedBrief = `Base Prompt Idea: "${originalPrompt}"\n\nKey Details & Specifications provided by the user:\n`;
      answeredQuestions.forEach(q => {
          // Format as a clear key-value pair for the AI
          detailedBrief += `*   **${q.question.replace('?', '')}:** ${q.answer}\n`;
      });

      try {
          // Pass this rich, detailed brief to the same enhancer used in regular mode.
          // The enhancer AI is tasked with turning this brief into a fully structured prompt.
          const result = await enhancePromptApi(detailedBrief);
          setEnhancedResult(result);
      } catch (err) {
          setError(err instanceof Error ? err.message : "An error occurred while generating the final prompt.");
      } finally {
          setIsLoading(false);
          setLoadingMessage('');
      }
  };


  const handleSelectExample = (prompt: string) => {
    setOriginalPrompt(prompt);
    handleEnhance(prompt);
  };
  
  const isQuestionnaireActive = isProMode && questions && questions.length > 0;

  return (
    <div className="min-h-screen bg-base-100 font-sans p-4 sm:p-6 lg:p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-secondary/20 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-primary/20 rounded-full filter blur-3xl opacity-50 animate-pulse animation-delay-4000"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <header className="flex flex-col sm:flex-row items-center justify-center text-center gap-4 mb-10 relative">
            <EnhanceIcon className="w-16 h-16 text-brand-secondary drop-shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-text-secondary">
                AI Prompt Enhancer
              </h1>
              <p className="text-text-secondary mt-2 text-lg">Transform simple ideas into powerful, precise instructions for LLMs.</p>
            </div>
            <div className="sm:absolute sm:top-1/2 sm:right-0 sm:-translate-y-1/2 mt-4 sm:mt-0">
               <ToggleSwitch
                  label="Pro Mode"
                  Icon={ProIcon}
                  enabled={isProMode}
                  setEnabled={() => {
                    setIsProMode(!isProMode);
                    resetState();
                  }}
                />
            </div>
          </header>

          <main>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PromptInput
                originalPrompt={originalPrompt}
                setOriginalPrompt={setOriginalPrompt}
                onEnhance={() => handleEnhance(originalPrompt)}
                isLoading={isLoading}
                isQuestionnaireActive={isQuestionnaireActive}
                isProMode={isProMode}
              />
              <div ref={resultRef}>
                  <ResultDisplay
                      result={enhancedResult}
                      isLoading={isLoading}
                      loadingMessage={loadingMessage}
                      error={error}
                      isProMode={isProMode}
                      questions={questions}
                      onQuestionnaireSubmit={handleQuestionnaireSubmit}
                  />
              </div>
            </div>
            {!isProMode && <Examples examples={examplesData} onSelectExample={handleSelectExample} />}
          </main>
      </div>
    </div>
  );
};

export default App;