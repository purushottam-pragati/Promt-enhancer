import React, { useState, useEffect } from 'react';
import type { Question } from '../types';
import { EnhanceIcon } from './Icons';

interface QuestionnaireProps {
    questions: Question[];
    onSubmit: (answeredQuestions: Question[]) => void;
}

export const Questionnaire: React.FC<QuestionnaireProps> = ({ questions, onSubmit }) => {
    const [answers, setAnswers] = useState<Record<number, string>>({});

    // Pre-fill first suggestion for select type questions
    useEffect(() => {
        const initialAnswers: Record<number, string> = {};
        questions.forEach(q => {
            if (q.type === 'select' && q.suggestions && q.suggestions.length > 0) {
                initialAnswers[q.id] = q.suggestions[0];
            }
        });
        setAnswers(initialAnswers);
    }, [questions]);

    const handleAnswerChange = (id: number, value: string) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    const answeredCount = Object.values(answers).filter(Boolean).length;
    const totalQuestions = questions.length;
    const progress = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;
    const allAnswered = answeredCount === totalQuestions;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (allAnswered) {
            const answeredQuestions = questions.map(q => ({
                ...q,
                answer: answers[q.id] || '',
            }));
            onSubmit(answeredQuestions);
        }
    };

    return (
        <div className="h-full flex flex-col animate-fade-in">
            <h3 className="text-lg font-bold text-text-primary mb-2">Please provide more details</h3>
            <p className="text-sm text-text-secondary mb-4">Answering these questions will help the AI create a much better result for you.</p>
            
            {/* Progress Bar */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-text-secondary">Progress</span>
                    <span className="text-xs font-semibold text-text-secondary">{answeredCount} / {totalQuestions}</span>
                </div>
                <div className="w-full bg-base-100/50 rounded-full h-2.5">
                    <div className="bg-brand-secondary h-2.5 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto space-y-5 pr-2">
                {questions.map(q => (
                    <div key={q.id}>
                        <label className="block text-sm font-medium text-text-primary mb-2" htmlFor={`question-${q.id}`}>
                            {q.question}
                        </label>
                        {q.type === 'select' && q.suggestions ? (
                            <select
                                id={`question-${q.id}`}
                                value={answers[q.id] || ''}
                                onChange={e => handleAnswerChange(q.id, e.target.value)}
                                className="w-full p-3 bg-base-100/70 border border-base-300/50 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary transition duration-200 text-text-primary"
                            >
                                {q.suggestions.map(suggestion => (
                                    <option key={suggestion} value={suggestion}>{suggestion}</option>
                                ))}
                            </select>
                        ) : (
                            <input
                                id={`question-${q.id}`}
                                type="text"
                                value={answers[q.id] || ''}
                                onChange={e => handleAnswerChange(q.id, e.target.value)}
                                className="w-full p-3 bg-base-100/70 border border-base-300/50 rounded-lg focus:ring-2 focus:ring-brand-secondary focus:border-brand-secondary transition duration-200 text-text-primary placeholder-text-secondary"
                                placeholder="Your answer..."
                                required
                            />
                        )}
                    </div>
                ))}
            </form>

            <button
                type="submit"
                onClick={handleSubmit}
                disabled={!allAnswered}
                className="mt-6 w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-brand-secondary/50 transition-all duration-300 transform hover:scale-[1.02] disabled:bg-gradient-to-br disabled:from-base-300 disabled:to-base-200 disabled:text-text-secondary disabled:cursor-not-allowed disabled:shadow-none disabled:scale-100"
            >
                <EnhanceIcon className="w-6 h-6" />
                Generate Enhanced Prompt
            </button>
        </div>
    );
};
