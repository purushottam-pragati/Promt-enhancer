import React from 'react';

interface ToggleSwitchProps {
    label: string;
    Icon: React.FC<{ className?: string }>;
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ label, Icon, enabled, setEnabled }) => {
    return (
        <div className="flex items-center gap-3">
            <Icon className={`w-6 h-6 transition-colors duration-300 ${enabled ? 'text-brand-secondary' : 'text-text-secondary'}`} />
            <span className={`font-semibold transition-colors duration-300 ${enabled ? 'text-text-primary' : 'text-text-secondary'}`}>{label}</span>
            <button
                type="button"
                className={`${
                enabled ? 'bg-brand-primary' : 'bg-base-300'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-secondary focus:ring-offset-2 focus:ring-offset-base-100`}
                role="switch"
                aria-checked={enabled}
                onClick={() => setEnabled(!enabled)}
            >
                <span
                aria-hidden="true"
                className={`${
                    enabled ? 'translate-x-5' : 'translate-x-0'
                } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
            </button>
        </div>
    );
};
