
export interface EnhancedPromptResponse {
  title: string;
  enhancedPrompt: string;
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
