
import type { Example } from '../types';

export const examplesData: Example[] = [
    {
        originalPrompt: "Explain blockchain.",
        enhancedPromptResponse: {
            title: "Blockchain Explained for a Non-Technical Audience",
            enhancedPrompt: "Act as an expert educator with a talent for simplifying complex topics. Your task is to explain the concept of a blockchain to a complete beginner with no prior knowledge of cryptography or computer science.\n\n**Instructions:**\n1.  **Use an Analogy:** Start with a simple, relatable analogy (e.g., a shared digital notebook, a public ledger) to explain the core idea.\n2.  **Key Concepts:** Clearly define and explain the following terms in simple language: block, chain, decentralization, and immutability.\n3.  **Structure:** Organize the explanation into short, easy-to-digest paragraphs or bullet points.\n4.  **Tone:** Maintain a friendly, encouraging, and conversational tone throughout.\n5.  **Constraints:** Avoid technical jargon. The final output should be approximately 250-300 words."
        }
    },
    {
        originalPrompt: "write a marketing email",
        enhancedPromptResponse: {
            title: "Marketing Email for New SaaS Product Launch",
            enhancedPrompt: "You are an expert direct-response copywriter. Your goal is to write a compelling marketing email to drive sign-ups for the launch of a new SaaS product called 'SyncUp', a project management tool for remote teams.\n\n**Audience:** Small to medium-sized business owners and team leads.\n\n**Email Structure:**\n1.  **Subject Line:** Create 3 attention-grabbing subject line options.\n2.  **Opening:** Start with a hook that directly addresses a primary pain point (e.g., scattered information, difficulty tracking progress).\n3.  **Body:** Introduce 'SyncUp' as the solution. Highlight 3 key benefits.\n4.  **Call to Action (CTA):** Include a clear and strong CTA, such as 'Get Your 14-Day Free Trial'.\n5.  **Closing:** End with a confident closing and a P.S. that offers a limited-time bonus.\n\n**Tone:** Professional yet persuasive and energetic."
        }
    },
    {
        originalPrompt: "a logo for my coffee shop",
        enhancedPromptResponse: {
            title: "Logo Design Prompt for 'The Daily Grind' Coffee Shop",
            enhancedPrompt: "You are a creative assistant generating a detailed design brief for an image generation model (e.g., Midjourney, DALL-E). The goal is to create a logo for a new coffee shop named 'The Daily Grind'.\n\n**Core Concept:** The brand identity should be rustic, cozy, and artisanal.\n\n**Prompt for Image Generation Model:**\n\"Logo design, vector art, minimalist style. A stylized coffee bean integrated with a mountain silhouette. The text 'The Daily Grind' is written below in a clean, sans-serif font. Color palette: earthy brown, forest green, and off-white. The logo should feel warm, organic, and professional. --no intricate details --style raw\""
        }
    }
];
