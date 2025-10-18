export interface PromptVariant {
  variantTitle: string;
  variantDescription: string;
  enhancedPrompt: string;
}

export interface StrategicVariants {
  directorsCut: PromptVariant;
  maverick: PromptVariant;
  catalyst: PromptVariant;
}

export interface EnhancementLog {
  userInput: string;
  autoCorrectedInput?: string;
  clarifications?: string[];
  addedDetails?: string[];
}

export interface EnhancedPromptResponse {
  overallTitle: string;
  variants: StrategicVariants;
  enhancementLog: EnhancementLog;
}

export interface Example {
    originalPrompt: string;
    enhancedPromptResponse: EnhancedPromptResponse;
}

export interface Question {
  id: number;
  question: string;
  type: 'text' | 'select';
  suggestions?: string[];
  answer?: string;
}

export interface PromptFeedback {
  overallRating: 'Poor' | 'Average' | 'Good';
  strengths: string[];
  suggestions: string[];
}
