import React from 'react';
import type { Example } from '../types';
import { MagicWandIcon } from './Icons';

interface ExamplesProps {
  examples: Example[];
  onSelectExample: (prompt: string) => void;
}

export const Examples: React.FC<ExamplesProps> = ({ examples, onSelectExample }) => {
  return (
    <div className="mt-16 animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-8 text-text-primary">Get Inspired</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {examples.map((example, index) => (
          <div key={index} className="bg-base-200/50 backdrop-blur-xl rounded-2xl border border-base-300/30 shadow-2xl shadow-black/20 p-6 flex flex-col justify-between group transition-all duration-300 hover:border-brand-secondary/50 hover:-translate-y-1">
            <div>
              <h3 className="text-lg font-bold text-brand-secondary mb-2 group-hover:text-purple-400 transition-colors">{example.enhancedPromptResponse.overallTitle}</h3>
              <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                <span className="font-semibold text-text-primary">Original:</span> "{example.originalPrompt}"
              </p>
            </div>
            <button
              onClick={() => onSelectExample(example.originalPrompt)}
              className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 bg-base-300/70 text-text-primary font-semibold rounded-lg hover:bg-gradient-to-r from-brand-primary to-brand-secondary hover:text-white transition-all duration-300"
            >
              <MagicWandIcon className="w-5 h-5" />
              Try this Example
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};