import React, { useState, useCallback, useRef } from 'react';
import { PromptInput } from './components/PromptInput';
import { ResultDisplay } from './components/ResultDisplay';
import { Examples } from './components/Examples';
import { enhancePrompt as enhancePromptApi, generateClarificationQuestions, autoCorrectPrompt } from './services/geminiService';
import type { EnhancedPromptResponse, Question } from './types';
import { EnhanceIcon, BrainCircuitIcon } from './components/Icons';
import { examplesData } from './data/examples';
import { ToggleSwitch } from './components/ToggleSwitch';

const App: React.FC = () => {
  const [originalPrompt, setOriginalPrompt] = useState<string>('');
  const [enhancedResult, setEnhancedResult] = useState<EnhancedPromptResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isGuidedMode, setIsGuidedMode] = useState<boolean>(false);
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
    setError(null);
    setEnhancedResult(null);
    setQuestions(null);
    setOriginalPrompt(promptToEnhance);
    setIsLoading(true);

    if (window.innerWidth < 1024 && resultRef.current) {
        resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // --- Babel Engine Module 1: Auto-Correction ---
    setLoadingMessage("Cleaning up prompt...");
    const correctedPrompt = await autoCorrectPrompt(promptToEnhance);

    if (isGuidedMode) {
      // --- Babel Engine Module 2: Interactive Clarification ---
      setLoadingMessage("Analyzing prompt for ambiguities...");
      try {
        const generatedQuestions = await generateClarificationQuestions(correctedPrompt);
        if (generatedQuestions.length === 0) {
          setLoadingMessage("No clarifications needed. Proceeding to enhance...");
          const result = await enhancePromptApi(correctedPrompt);
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
      // --- Direct Enhancement Flow ---
      setLoadingMessage("Our AI is working its magic to enhance your prompt...");
      try {
        const result = await enhancePromptApi(correctedPrompt);
        setEnhancedResult(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setIsLoading(false);
        setLoadingMessage('');
      }
    }
  }, [isGuidedMode]);

  const handleQuestionnaireSubmit = async (answeredQuestions: Question[]) => {
      setIsLoading(true);
      setLoadingMessage("Synthesizing your answers and crafting the final prompt...");
      setQuestions(null);
      
      let detailedBrief = `Base Prompt Idea: "${originalPrompt}"\n\nKey Details & Specifications provided by the user:\n`;
      const clarifications: string[] = [];
      answeredQuestions.forEach(q => {
          const answerText = `**${q.question.replace('?', '')}:** ${q.answer}`;
          detailedBrief += `*   ${answerText}\n`;
          clarifications.push(`Clarified "${q.question}" with the answer: "${q.answer}"`);
      });

      try {
          const result = await enhancePromptApi(detailedBrief);
          // Manually add clarifications to the log for the transparency module
          if (result.enhancementLog) {
            result.enhancementLog.clarifications = clarifications;
          }
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
  
  const isQuestionnaireActive = isGuidedMode && questions && questions.length > 0;

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
                  label="Guided Enhancement"
                  Icon={BrainCircuitIcon}
                  enabled={isGuidedMode}
                  setEnabled={() => {
                    setIsGuidedMode(!isGuidedMode);
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
                isGuidedMode={isGuidedMode}
              />
              <div ref={resultRef}>
                  <ResultDisplay
                      result={enhancedResult}
                      isLoading={isLoading}
                      loadingMessage={loadingMessage}
                      error={error}
                      isGuidedMode={isGuidedMode}
                      questions={questions}
                      onQuestionnaireSubmit={handleQuestionnaireSubmit}
                      originalPrompt={originalPrompt}
                  />
              </div>
            </div>
            {!isGuidedMode && <Examples examples={examplesData} onSelectExample={handleSelectExample} />}
          </main>
      </div>
    </div>
  );
};

export default App;
