import React from 'react';

type IconProps = {
    className?: string;
};

export const EnhanceIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.543l.227 1.061.227-1.061a2.25 2.25 0 00-1.488-1.488l-1.06-.227 1.06-.227a2.25 2.25 0 001.488-1.488l.227-1.06.227 1.06a2.25 2.25 0 001.488 1.488l1.06.227-1.06.227a2.25 2.25 0 00-1.488 1.488z" />
    </svg>
);

export const LoadingSpinner: React.FC<IconProps> = ({ className }) => (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const CopyIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
    </svg>
);

export const CheckIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
);

export const MagicWandIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69a.75.75 0 01.82.161m-6.067-3.412a.75.75 0 01.162.819A5.972 5.972 0 0015 15a6 6 0 006-6 5.972 5.972 0 00-2.28-.523.75.75 0 01.161.82M6.75 12a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75z" />
    </svg>
);

export const BrainCircuitIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.507a25.48 25.48 0 000 15.006a25.48 25.48 0 010-15.006zM15.75 4.507a25.48 25.48 0 010 15.006a25.48 25.48 0 000-15.006zM5.104 6.342a3.375 3.375 0 010 11.316M18.896 6.342a3.375 3.375 0 000 11.316M8.25 12a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.161 4.52a2.25 2.25 0 01-2.07 1.835l-.14.018a2.25 2.25 0 00-2.07 1.835l-.14.018m12.336 8.78a2.25 2.25 0 012.07-1.835l.14-.018a2.25 2.25 0 002.07-1.835l.14-.018M11.25 4.522c0-1.84.733-3.525 2.06-4.522m-5.62 19.044c-1.327-1-2.06-2.682-2.06-4.522m11.24 0c0 1.84-.733 3.525-2.06 4.522m-5.62-19.044c1.327-1 2.06-2.682 2.06-4.522m0 0a2.25 2.25 0 012.25 2.25v.75m-2.25-3a2.25 2.25 0 00-2.25 2.25v.75m0 13.5c0 1.243.39 2.39 1.073 3.33m-.001-15.83a2.25 2.25 0 012.121-2.121 2.25 2.25 0 012.121 2.121m0 13.5c0 .381.04.755.114 1.121m-2.349-16.242a2.25 2.25 0 00-2.121 2.121 2.25 2.25 0 00-2.121-2.121" />
  </svg>
);

export const SendIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
);

export const InfoIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
