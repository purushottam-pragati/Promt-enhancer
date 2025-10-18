import type { Example } from '../types';

export const examplesData: Example[] = [
    {
        originalPrompt: "Explain blockchain.",
        enhancedPromptResponse: {
            overallTitle: "Understanding Blockchain",
            variants: {
                directorsCut: {
                    variantTitle: "The Director's Cut",
                    variantDescription: "A detailed, analogy-driven explanation for a non-technical audience.",
                    enhancedPrompt: "**Persona:**\n*   Act as an expert educator with a talent for simplifying complex topics.\n\n**Task:**\n*   Explain the concept of a blockchain to a complete beginner.\n\n**Key Elements & Context:**\n*   **Core Analogy:** Use the metaphor of a shared, unchangeable public notebook that everyone can see but no one can alter once a page is written.\n*   **Concepts to Cover:**\n    *   **Block:** A page in the notebook containing a list of transactions.\n    *   **Chain:** How the pages are securely linked together with a unique seal, making tampering evident.\n    *   **Decentralization:** The notebook isn't owned by one person; everyone has a copy, ensuring consensus.\n    *   **Immutability:** Once a page is added, it cannot be erased, providing a permanent record.\n\n**Constraints & Rules:**\n*   **Tone:** Friendly, encouraging, and conversational.\n*   **Length:** Approximately 250-300 words.\n\n**Avoid:**\n*   Do not use technical jargon like 'hash', 'node', or 'cryptography' without a simple explanation.\n\n**Output Format:**\n*   A clear, structured article with headings for each concept."
                },
                maverick: {
                    variantTitle: "The Maverick",
                    variantDescription: "An unconventional explanation from the perspective of a single dollar.",
                    enhancedPrompt: "**Persona:**\n*   You are a single dollar bill. You are sentient, and you have been in circulation for decades. You've seen it all.\n\n**Task:**\n*   Explain your frustration with the traditional banking system and how a 'blockchain' system for money would change your life.\n\n**Key Elements & Context:**\n*   **Your Pain Points:** Talk about how you get lost, copied (counterfeited), and how a central bank controls your existence. You never truly know your own history.\n*   **The Blockchain Dream:** Describe a system where your every move is recorded in a public diary that can't be erased. You would have a public, verifiable history, making you unique and impossible to fake. Every copy of the diary would be identical, so everyone would know your story is true.\n\n**Constraints & Rules:**\n*   **Perspective:** First-person, from the dollar's point of view.\n*   **Tone:** A bit jaded, a bit hopeful, and very personal.\n\n**Avoid:**\n*   Do not get bogged down in technical specifics. Focus on the emotional and philosophical difference from your current life.\n\n**Output Format:**\n*   A short, personal monologue."
                },
                catalyst: {
                    variantTitle: "The Catalyst",
                    variantDescription: "A minimalist prompt for the most powerful, core explanation.",
                    enhancedPrompt: "**Persona:**\n*   Act as a master of analogies.\n\n**Task:**\n*   Provide the single most powerful and simple analogy to explain the core benefit of blockchain technology.\n\n**Core Elements:**\n*   **The Subject:** Blockchain.\n*   **The Goal:** Unbreakable trust without a middleman.\n*   **The Theme:** Transparency and permanence.\n\n**Avoid:**\n*   Do not use more than one analogy. Do not exceed 100 words.\n\n**Output Format:**\n*   A single, powerful analogy, followed by a one-sentence explanation of why it works."
                }
            },
            // FIX: Added missing enhancementLog property.
            enhancementLog: {
                userInput: "Explain blockchain.",
                addedDetails: [
                    "Introduced a core analogy of a 'shared public notebook' to simplify the concept.",
                    "Structured the explanation into key concepts: Block, Chain, Decentralization, and Immutability.",
                    "Created distinct personas (educator, a dollar bill, master of analogies) to provide varied perspectives."
                ]
            }
        }
    },
    {
        originalPrompt: "write a marketing email",
        enhancedPromptResponse: {
            overallTitle: "Marketing Campaign for 'SyncUp'",
            variants: {
                directorsCut: {
                    variantTitle: "The Director's Cut",
                    variantDescription: "A detailed brief for a classic, high-conversion direct-response email.",
                    enhancedPrompt: "**Persona:**\n*   You are an expert direct-response copywriter. Your goal is to drive sign-ups for a new SaaS product called 'SyncUp'.\n\n**Task:**\n*   Write a compelling marketing email for the launch of 'SyncUp'.\n\n**Key Elements & Context:**\n*   **Product:** 'SyncUp', a project management tool for remote teams.\n*   **Audience:** Small to medium-sized business owners and team leads.\n*   **Pain Points:** Scattered information, missed deadlines, difficulty tracking progress for remote employees.\n*   **Key Benefits:** Centralized workflow, clear progress visualization, seamless team collaboration.\n\n**Constraints & Rules:**\n*   **Tone:** Professional yet persuasive and energetic.\n*   **Structure:** Must include 3 subject line options, a hook, body copy highlighting benefits, a strong Call to Action (CTA), and a P.S. with a bonus.\n\n**Avoid:**\n*   Do not focus on features; focus on the benefits and the solutions to the audience's pain points.\n\n**Output Format:**\n*   A complete marketing email draft."
                },
                maverick: {
                    variantTitle: "The Maverick",
                    variantDescription: "A modern twist using a short, punchy social media campaign instead of an email.",
                    enhancedPrompt: "**Persona:**\n*   You are a savvy social media manager specializing in snappy, attention-grabbing content for Twitter/X.\n\n**Task:**\n*   Create a 3-tweet thread to announce the launch of 'SyncUp', a new project management tool for remote teams.\n\n**Key Elements & Context:**\n*   **Tweet 1 (The Hook):** Start with a relatable problem. 'Your remote team's workflow is a mess, isn't it? 📁🤯📄'.\n*   **Tweet 2 (The Solution):** Introduce SyncUp and its core benefit. 'We built SyncUp to fix that. One tool to rule them all. See all projects, track all progress, instantly.' Include a short GIF of the dashboard.\n*   **Tweet 3 (The CTA):** Drive action with a limited-time offer. 'Stop chasing updates. Start shipping. Launching this week with a 14-day free trial. Link in bio. #remotework #saaslaunch'.\n\n**Constraints & Rules:**\n*   **Tone:** Energetic, concise, and uses relevant emojis and hashtags.\n*   **Length:** Each tweet must be within the platform's character limit.\n\n**Avoid:**\n*   Avoid corporate jargon. Keep the language simple and direct.\n\n**Output Format:**\n*   A sequence of three distinct tweets."
                },
                catalyst: {
                    variantTitle: "The Catalyst",
                    variantDescription: "A minimalist prompt focusing on the core emotional message.",
                    enhancedPrompt: "**Persona:**\n*   Act as a brand strategist.\n\n**Task:**\n*   Craft the core message for a marketing campaign for a new product.\n\n**Core Elements:**\n*   **Product Name:** SyncUp.\n*   **Audience:** Overwhelmed managers of remote teams.\n*   **Core Emotion to Evoke:** Relief. The feeling of finally being in control and organized.\n\n**Avoid:**\n*   Do not write the full ad copy. Focus only on the central theme and tagline.\n\n**Output Format:**\n*   A single-sentence core message and three powerful tagline options."
                }
            },
            // FIX: Added missing enhancementLog property.
            enhancementLog: {
                userInput: "write a marketing email",
                autoCorrectedInput: "Write a marketing email.",
                addedDetails: [
                    "Invented a product name ('SyncUp') and target audience to provide specific context.",
                    "Defined clear pain points and benefits to create a persuasive marketing angle.",
                    "Expanded the request into different formats (email, tweet thread, core message) for strategic variety."
                ]
            }
        }
    },
    {
        originalPrompt: "a logo for my coffee shop",
        enhancedPromptResponse: {
            overallTitle: "Logo Design for 'The Daily Grind'",
            variants: {
                directorsCut: {
                    variantTitle: "The Director's Cut",
                    variantDescription: "A detailed, specific design brief for an image generation model.",
                    enhancedPrompt: "**Persona:**\n*   You are a creative director briefing an AI image generation model (e.g., Midjourney, DALL-E).\n\n**Task:**\n*   Generate a detailed design brief for a logo for a new coffee shop named 'The Daily Grind'.\n\n**Key Elements & Context:**\n*   **Brand Identity:** Rustic, cozy, artisanal, warm, organic, and professional.\n*   **Visual Elements:** A stylized coffee bean integrated with a mountain silhouette.\n*   **Typography:** The text 'The Daily Grind' below the icon in a clean, sans-serif font.\n*   **Color Palette:** Earthy brown, forest green, and off-white.\n\n**Constraints & Rules:**\n*   **Style:** Vector art, minimalist style. This is crucial for a logo.\n*   **Parameters:** Include technical parameters for the AI like `--no intricate details --style raw` to guide the output.\n\n**Avoid:**\n*   Avoid overly complex or photorealistic imagery. The logo must be simple and scalable.\n\n**Output Format:**\n*   A single, well-formed text prompt ready to be pasted into an image generation AI."
                },
                maverick: {
                    variantTitle: "The Maverick",
                    variantDescription: "An unconventional approach that avoids all typical coffee-related imagery.",
                    enhancedPrompt: "**Persona:**\n*   You are a conceptual brand artist briefing an AI image generation model.\n\n**Task:**\n*   Generate logo concepts for a coffee shop, 'The Daily Grind,' that evokes the *feeling* of coffee without showing any coffee-related items.\n\n**Key Elements & Context:**\n*   **Core Concept:** Focus on the feeling of the first sip of coffee in the morning—a gentle, warm awakening, like a sunrise.\n*   **Visual Elements:** An abstract, minimalist representation of a rising sun. The sun's rays could be subtle, warm lines that form a circle or a unique shape.\n*   **Typography:** The name 'The Daily Grind' should be soft and approachable.\n\n**Constraints & Rules:**\n*   **Tone:** Minimalist, abstract, warm.\n*   **Strict Negative Constraint:** The prompt must explicitly forbid the use of coffee beans, coffee cups, steam, or any direct coffee iconography.\n\n**Avoid:**\n*   Do not use any clichés associated with coffee shops.\n\n**Output Format:**\n*   A text prompt for an image generation model, focused on abstract concepts."
                },
                catalyst: {
                    variantTitle: "The Catalyst",
                    variantDescription: "A minimal prompt using only keywords to maximize the AI's creative interpretation.",
                    enhancedPrompt: "**Persona:**\n*   You are an AI image generation model.\n\n**Task:**\n*   Generate a logo based on a set of keywords.\n\n**Core Elements:**\n*   **Subject:** Logo for 'The Daily Grind' coffee shop.\n*   **Keywords:** Rustic, Cozy, Artisanal, Minimalist, Earthy.\n\n**Avoid:**\n*   Do not use bright, neon colors.\n\n**Output Format:**\n*   A text prompt string combining the keywords for an image generation AI."
                }
            },
            // FIX: Added missing enhancementLog property.
            enhancementLog: {
                userInput: "a logo for my coffee shop",
                addedDetails: [
                    "Created a brand identity ('The Daily Grind') with a rustic, cozy feel.",
                    "Specified concrete visual elements, typography, and color palettes for the AI image generator.",
                    "Included technical parameters and negative constraints to guide the AI's output effectively."
                ]
            }
        }
    }
];