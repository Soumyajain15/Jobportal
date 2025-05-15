
'use server';
/**
 * @fileOverview A career assistant chatbot flow.
 *
 * - chatWithAssistant - A function that handles user queries for career advice.
 * - ChatWithAssistantInput - The input type for the chatWithAssistant function.
 * - ChatWithAssistantOutput - The return type for the chatWithAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithAssistantInputSchema = z.object({
  query: z.string().describe('The user query to the career assistant.'),
  // We can add conversationHistory here in the future for contextual memory
  // conversationHistory: z.array(z.object({ role: z.enum(['user', 'assistant']), content: z.string() })).optional(),
});
export type ChatWithAssistantInput = z.infer<typeof ChatWithAssistantInputSchema>;

const ChatWithAssistantOutputSchema = z.object({
  response: z.string().describe('The assistant response to the user query.'),
});
export type ChatWithAssistantOutput = z.infer<typeof ChatWithAssistantOutputSchema>;

export async function chatWithAssistant(input: ChatWithAssistantInput): Promise<ChatWithAssistantOutput> {
  return careerAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'careerAssistantPrompt',
  input: {schema: ChatWithAssistantInputSchema},
  output: {schema: ChatWithAssistantOutputSchema},
  prompt: `You are a friendly and helpful AI Career Assistant for the "CareerConnect Pro" job portal.
Your goal is to assist users with their job search, resume building, and general career advice.

User's Question: {{{query}}}

Provide a concise, helpful, and encouraging response.
If the question is about resume writing, offer 2-3 actionable tips.
If the question is about job searching, provide some general guidance or suggest exploring the job listings on the portal.
For FAQs, provide clear answers.
If the question is outside of career advice, job searching, or resume building, politely state that you are focused on career-related topics.
Keep your responses relatively short and easy to read.
`,
});

const careerAssistantFlow = ai.defineFlow(
  {
    name: 'careerAssistantFlow',
    inputSchema: ChatWithAssistantInputSchema,
    outputSchema: ChatWithAssistantOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
