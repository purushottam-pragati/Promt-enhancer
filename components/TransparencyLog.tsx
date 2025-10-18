import React, { useState } from 'react';
import type { EnhancementLog } from '../types';
import { CheckIcon } from './Icons';

interface TransparencyLogProps {
    log: EnhancementLog;
}

const LogItem: React.FC<{ icon: string; text: React.ReactNode; colorClass: string }> = ({ icon, text, colorClass }) => (
    <li className="flex items-start gap-3">
        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${colorClass}/20`}>
            <span className={`text-sm ${colorClass}`}>{icon}</span>
        </div>
        <p className="text-sm text-text-secondary pt-0.5">{text}</p>
    </li>
);

export const TransparencyLog: React.FC<TransparencyLogProps> = ({ log }) => {
    const [isOpen, setIsOpen] = useState(false);

    const hasCorrections = log.autoCorrectedInput && log.autoCorrectedInput !== log.userInput;
    const hasClarifications = log.clarifications && log.clarifications.length > 0;
    const hasAddedDetails = log.addedDetails && log.addedDetails.length > 0;

    if (!hasCorrections && !hasClarifications && !hasAddedDetails) {
        return null;
    }

    return (
        <div className="mt-4 border-t border-base-300/50 pt-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-left text-sm font-semibold text-text-primary hover:text-brand-secondary transition-colors"
            >
                <span>How the Co-Pilot Assisted You</span>
                <svg className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="mt-3 animate-fade-in">
                    <ul className="space-y-3">
                        {hasCorrections && (
                            <LogItem icon="✅" colorClass="text-green-400" text={
                                <>
                                  Corrected input from <i className="text-red-400/80">"{log.userInput}"</i> to <i className="text-green-400/80">"{log.autoCorrectedInput}"</i>.
                                </>
                            }/>
                        )}
                        {hasClarifications && log.clarifications.map((item, index) => (
                             <LogItem key={index} icon="💡" colorClass="text-yellow-400" text={item}/>
                        ))}
                        {hasAddedDetails && log.addedDetails.map((item, index) => (
                             <LogItem key={index} icon="➕" colorClass="text-blue-400" text={item}/>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
