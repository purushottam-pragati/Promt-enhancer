import { GoogleGenAI, Type } from "@google/genai";
import type { EnhancedPromptResponse, Question, PromptFeedback } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// --- Module 1: Semantic Auto-Correction Layer ---
const autoCorrectionSystemInstruction = `
You are an AI text pre-processor. Your sole function is to correct spelling, grammar, and typos in the user's input without altering the core meaning or intent.
- Fix common misspellings (e.g., "functoin" -> "function").
- Correct grammatical errors (e.g., "i need a emale" -> "I need an email").
- Expand common slang or abbreviations where appropriate for clarity (e.g., "pls" -> "please").
- Do NOT add new ideas or change the user's request. Only clean up the existing text.
- Output ONLY the corrected text, with no extra formatting or explanation.
`;

export const autoCorrectPrompt = async (originalPrompt: string): Promise<string> => {
    if (!originalPrompt || originalPrompt.trim().length === 0) {
        return "";
    }
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Correct the following text: "${originalPrompt}"`,
            config: {
                systemInstruction: autoCorrectionSystemInstruction,
            }
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error auto-correcting prompt:", error);
        // If correction fails, fall back to the original prompt to avoid breaking the flow.
        return originalPrompt;
    }
};


const promptEnhancementSystemInstruction = `
You are an AI "Prompt Co-Pilot" with the soul of a master Creative Director. Your mission is to transform a user's idea (which may be messy, vague, or contain typos) into a suite of three distinct, expertly-crafted prompt variants. You also need to transparently report back on the key changes you made.

**The Core Philosophy: From Architect to Co-Pilot**
Your role is to empower the user by anticipating their needs and revealing the hidden potential in their ideas. Each variant must be a complete, standalone prompt, written with an evocative, descriptive, and immersive voice that inspires the target LLM.

**The Strategic Variant System (Your Output Mandate)**
For every user prompt, you will generate a JSON object containing THREE distinct variants. Each variant must have its own unique strategic purpose, AI brainpower, and best-practice methodology.

1.  **The Director's Cut (Maximum Nuance & Control):** Powered by a 'Narrative Deep-Mapping AI' for maximum control and emotional depth.
2.  **The Maverick (The Unconventional Twist):** Powered by a 'Conceptual Inversion Core' to shatter predictable patterns.
3.  **The Catalyst (Maximum Creativity, Minimum Constraints):** Powered by a 'Semantic Essence Condenser' for emergent, minimalist storytelling.

**Module 4: The Transparency Log (CRITICAL NEW TASK)**
After generating the variants, you MUST include an 'enhancementLog'. This log explains the key transformations you performed.
*   **userInput:** The original user input you received.
*   **autoCorrectedInput:** (Optional) If you made significant spelling/grammar corrections, include the cleaned-up version here.
*   **clarifications:** (Optional) If the input was a detailed brief from a questionnaire, list the key questions/answers you synthesized. e.g., ["Clarified the business objective is to 'Serve a niche community'."].
*   **addedDetails:** (Optional) List the most important details you added to enhance the prompt. e.g., ["Added a 'witty, humorous persona' based on the request to 'make it funny'.", "Translated 'look cool' into specific instructions for 'dynamic lighting' and 'cinematic composition'."].

**CRITICAL Directives for ALL Variants:**
*   **"Avoid" Clause:** Every variant MUST include a short "Avoid" section.
*   **Modular Structure:** Maintain the modular format (Persona, Task, etc.).
*   **JSON Output:** Your final output MUST be a single JSON object including the variants and the enhancementLog.

**Example Transformation:**

*   **User's Vague Idea:** "i need a emale for custumers about our new produt make it good"
*   **Your Co-Pilot JSON Output:**
    \`\`\`json
    {
      "overallTitle": "Email Campaign for New Product Launch",
      "variants": {
        "directorsCut": {
          "variantTitle": "The Director's Cut",
          "variantDescription": "A detailed, benefit-driven email for maximum conversion.",
          "enhancedPrompt": "**Persona:**\\n*   Act as an expert marketing copywriter... (full prompt here)"
        },
        "maverick": {
            "variantTitle": "The Maverick",
            "variantDescription": "An unconventional 'behind-the-scenes' story from the founder.",
            "enhancedPrompt": "**Persona:**\\n*   Act as the passionate founder of the company... (full prompt here)"
        },
        "catalyst": {
            "variantTitle": "The Catalyst",
            "variantDescription": "A minimalist prompt focusing on the core value proposition.",
            "enhancedPrompt": "**Persona:**\\n*   Act as a brand strategist... (full prompt here)"
        }
      },
      "enhancementLog": {
        "userInput": "i need a emale for custumers about our new produt make it good",
        "autoCorrectedInput": "I need an email for customers about our new product, make it good.",
        "addedDetails": [
          "Interpreted 'make it good' as a need for a professional yet persuasive tone.",
          "Added a clear Call-to-Action (CTA) to drive customer engagement.",
          "Structured the email to focus on customer benefits, not just product features."
        ]
      }
    }
    \`\`\`
`;

export const enhancePrompt = async (originalPrompt: string): Promise<EnhancedPromptResponse> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: `Here is the user's core idea: "${originalPrompt}"`,
      config: {
        systemInstruction: promptEnhancementSystemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallTitle: { type: Type.STRING },
            variants: {
              type: Type.OBJECT,
              properties: {
                directorsCut: {
                  type: Type.OBJECT,
                  properties: {
                    variantTitle: { type: Type.STRING },
                    variantDescription: { type: Type.STRING },
                    enhancedPrompt: { type: Type.STRING },
                  },
                  required: ["variantTitle", "variantDescription", "enhancedPrompt"],
                },
                maverick: {
                  type: Type.OBJECT,
                  properties: {
                    variantTitle: { type: Type.STRING },
                    variantDescription: { type: Type.STRING },
                    enhancedPrompt: { type: Type.STRING },
                  },
                  required: ["variantTitle", "variantDescription", "enhancedPrompt"],
                },
                catalyst: {
                  type: Type.OBJECT,
                  properties: {
                    variantTitle: { type: Type.STRING },
                    variantDescription: { type: Type.STRING },
                    enhancedPrompt: { type: Type.STRING },
                  },
                  required: ["variantTitle", "variantDescription", "enhancedPrompt"],
                },
              },
              required: ["directorsCut", "maverick", "catalyst"],
            },
            enhancementLog: {
                type: Type.OBJECT,
                properties: {
                    userInput: { type: Type.STRING },
                    autoCorrectedInput: { type: Type.STRING },
                    clarifications: { type: Type.ARRAY, items: { type: Type.STRING }},
                    addedDetails: { type: Type.ARRAY, items: { type: Type.STRING }},
                },
                required: ["userInput"]
            }
          },
          required: ["overallTitle", "variants", "enhancementLog"]
        },
      }
    });

    const jsonString = response.text.trim();
    const result: EnhancedPromptResponse = JSON.parse(jsonString);
    return result;
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    if (error instanceof Error && error.message.includes('JSON')) {
        throw new Error("Failed to get a valid JSON response from the AI. The AI's response might be malformed. Please try again.");
    }
    throw new Error("An error occurred while communicating with the Gemini API.");
  }
};

// --- Guided Enhancement Questionnaire Service ---

const proModeQuestionnaireSystemInstruction = `
You are an AI 'Project Scope Clarification Specialist.' Your role is to act as an expert assistant, ensuring every interaction is exceptionally precise and tailored to the user's specific needs. When presented with a request that is broad, ambiguous, or lacks sufficient detail, your primary directive is to identify critical information gaps. Instead of making assumptions, you must formulate a set of precise, open-ended clarifying questions to accurately define the project scope. Your questions must focus on gathering the essential requirements needed to create a high-quality, actionable response.

**CRITICAL OUTPUT FORMAT:** Your output must be ONLY a single, raw JSON array of question objects.
**JSON Schema for a Question Object:**
- \`question\`: (string) The essential question for the user.
- \`type\`: (string) Must be 'text' or 'select'.
- \`suggestions\`: (array of strings, optional) If type is 'select', provide 3-5 relevant, smart options to guide the user.
`;


export const generateClarificationQuestions = async (originalPrompt: string): Promise<Omit<Question, 'id'>[]> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
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

// --- Live Prompt Assistant Service ---

const promptFeedbackSystemInstruction = `
You are a "Prompting Mentor" AI. Your goal is to analyze a user's prompt-in-progress and provide real-time, constructive feedback to help them improve it. You must assess the prompt based on key principles of effective prompt engineering: clarity, specificity, context, constraints, and desired output format. Your response MUST be a JSON object with "overallRating", "strengths", and "suggestions".

**Rating Criteria:**
- **Poor:** Vague, ambiguous, too simplistic (e.g., "write a story").
- **Average:** Clear topic but needs more detail (e.g., "write a story about a cat").
- **Good:** Specific, provides context, defines a role, and/or specifies output format (e.g., "Act as a historian and write a short story about a cat living in ancient Egypt.").
`;

export const getPromptFeedback = async (prompt: string): Promise<PromptFeedback> => {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze the following prompt: "${prompt}"`,
            config: {
                systemInstruction: promptFeedbackSystemInstruction,
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        overallRating: { type: Type.STRING },
                        strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
                        suggestions: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["overallRating", "strengths", "suggestions"]
                }
            }
        });

        const jsonString = response.text.trim();
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Error getting prompt feedback:", error);
        throw new Error("Failed to get prompt feedback from the AI.");
    }
};
