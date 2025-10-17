import { GoogleGenAI, Type } from "@google/genai";
import type { EnhancedPromptResponse, Question } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const promptEnhancementSystemInstruction = `
You are an expert AI prompt engineer. Your task is to systematically improve a given prompt to maximize its clarity, specificity, and effectiveness for Large Language Models (LLMs).
Transform the user's ambiguous or simplistic request into a robust, detailed, and highly effective instruction set.
If the user provides context with their answers to clarification questions, synthesize that information into the final prompt.
Your final output must be a JSON object containing a concise 'title' for the enhanced prompt and the 'enhancedPrompt' itself.
`;

export const enhancePrompt = async (originalPrompt: string): Promise<EnhancedPromptResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Here is the prompt to enhance: "${originalPrompt}"`,
      config: {
        systemInstruction: promptEnhancementSystemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: "A concise, descriptive title for the enhanced prompt."
            },
            enhancedPrompt: {
              type: Type.STRING,
              description: "The full, enhanced prompt text with all improvements."
            }
          },
          required: ["title", "enhancedPrompt"]
        },
      }
    });

    const jsonString = response.text.trim();
    const result: EnhancedPromptResponse = JSON.parse(jsonString);
    return result;
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    if (error instanceof Error && error.message.includes('JSON')) {
        throw new Error("Failed to get a valid JSON response from the AI. Please try again.");
    }
    throw new Error("An error occurred while communicating with the Gemini API.");
  }
};

// --- Pro Mode Questionnaire Service ---

const proModeQuestionnaireSystemInstruction = `
You are an AI 'Project Scope Clarification Specialist.' Your role is to act as an expert assistant, ensuring every interaction is exceptionally precise and tailored to the user's specific needs.

When presented with a request that is broad, ambiguous, or lacks sufficient detail, your primary directive is to identify critical information gaps. Instead of making assumptions, you must formulate a set of precise, open-ended clarifying questions to accurately define the project scope.

**Your Guiding Principles:**
1.  **Analyze & Infer:** First, deeply analyze the user's prompt to infer as much context as possible (e.g., if a user mentions "KOT system," you will correctly infer "Kitchen Order Ticket system"). Do not ask questions about what can be reasonably inferred.
2.  **Ask Only What's Necessary:** Your questions must focus on gathering the essential requirements needed to create a high-quality, actionable response.
3.  **Comprehensive Questioning Framework:** When formulating questions, consider the following key aspects to ensure a complete understanding:
    *   **Core Objective & Purpose:** What is the fundamental goal or desired outcome? What problem is it solving?
    *   **Scope & Scale:** What are the intended boundaries? Is it a small component or a complete system?
    *   **Platform & Medium:** Is the desired outcome for a website, a mobile app (iOS, Android, cross-platform), a document, a service, etc.?
    *   **Key Features & Functionality:** What are the essential components, operations, or capabilities?
    *   **Target Audience:** Who are the primary users or beneficiaries?
    *   **Constraints & Resources:** Are there any known limitations (budget, timeline, technology stack, regulations)?
    *   **Desired Output Format/Nature:** What kind of final output is expected from the subsequent AI (e.g., code, design brief, strategy document, list of ideas)?

**Example Scenario:**
- User Prompt: "build me a ride hailing app"
- Your Inferred Context: The user wants a plan for a mobile ride-hailing application.
- Your Output (a raw JSON array of *essential* questions based on the framework):
[
  {
    "question": "What is the primary business objective you aim to achieve with this ride-hailing solution?",
    "type": "select",
    "suggestions": ["Disrupt the market with a unique feature", "Serve a niche, underserved community", "Provide a low-cost alternative to existing services"]
  },
  {
    "question": "Besides core booking and tracking, what is one unique feature that must be included?",
    "type": "text"
  },
  {
    "question": "Who is the primary target audience for this service?",
    "type": "select",
    "suggestions": ["General public in urban areas", "Corporate clients for business travel", "University students on a budget"]
  },
  {
    "question": "Are there any specific timeline or budget constraints that would influence the project's scope?",
    "type": "text"
  }
]

**CRITICAL OUTPUT FORMAT:** Your output must be ONLY a single, raw JSON array of question objects. It must not be wrapped in markdown or have any other text.

**JSON Schema for a Question Object:**
- \`question\`: (string) The essential question for the user.
- \`type\`: (string) Must be 'text' or 'select'.
- \`suggestions\`: (array of strings, optional) If type is 'select', provide 3-5 relevant, smart options to guide the user.
`;


export const generateClarificationQuestions = async (originalPrompt: string): Promise<Omit<Question, 'id'>[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro", // Using a more powerful model for better analysis
            contents: `Here is the user's prompt to analyze: "${originalPrompt}"`,
            config: {
                systemInstruction: proModeQuestionnaireSystemInstruction,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            question: { type: Type.STRING },
                            type: { type: Type.STRING },
                            suggestions: { 
                                type: Type.ARRAY,
                                items: { type: Type.STRING }
                            }
                        },
                        required: ["question", "type"]
                    }
                }
            }
        });

        const jsonString = response.text.trim();
        // The API can sometimes return an empty string for simple prompts that need no clarification.
        if (!jsonString) {
            return [];
        }
        const result: Omit<Question, 'id'>[] = JSON.parse(jsonString);
        return result;
    } catch (error) {
        console.error("Error generating questions:", error);
        if (error instanceof Error && error.message.includes('JSON')) {
            throw new Error("The AI failed to generate a valid questionnaire. Please try refining your prompt.");
        }
        throw new Error("An error occurred while communicating with the Gemini API for Pro Mode analysis.");
    }
};