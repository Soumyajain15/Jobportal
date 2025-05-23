
'use server';

/**
 * @fileOverview An ATS resume analyzer flow that scores a resume against a job description and provides suggestions for improvement.
 *
 * - analyzeResume - A function that handles the resume analysis process.
 * - AnalyzeResumeInput - The input type for the analyzeResume function.
 * - AnalyzeResumeOutput - The return type for the analyzeResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeResumeInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "The resume file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  jobDescription: z.string().describe('The job description to match the resume against.'),
});
export type AnalyzeResumeInput = z.infer<typeof AnalyzeResumeInputSchema>;

const AnalyzeResumeOutputSchema = z.object({
  atsScore: z.number().describe('The ATS score of the resume against the job description.'),
  suggestions: z.array(z.string()).describe('Suggestions on how to improve the resume.'),
});
export type AnalyzeResumeOutput = z.infer<typeof AnalyzeResumeOutputSchema>;

export async function analyzeResume(input: AnalyzeResumeInput): Promise<AnalyzeResumeOutput> {
  return analyzeResumeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeResumePrompt',
  input: {schema: AnalyzeResumeInputSchema},
  output: {schema: AnalyzeResumeOutputSchema},
  prompt: `You are an expert resume analyst specializing in Applicant Tracking Systems (ATS). You will analyze the resume and job description to provide an ATS score and suggestions for improvement.

Analyze the resume provided against the following job description. Provide an ATS score from 0 to 100, and list suggestions for improvement. Suggestions should be specific and actionable.

Job Description: {{{jobDescription}}}

Resume: {{media url=resumeDataUri}}

Output the ATS score and suggestions in JSON format that strictly adheres to the following schema:
{
  "atsScore": "number (0-100)",
  "suggestions": ["string"]
}
`,
});

const analyzeResumeFlow = ai.defineFlow(
  {
    name: 'analyzeResumeFlow',
    inputSchema: AnalyzeResumeInputSchema,
    outputSchema: AnalyzeResumeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      console.error('ATS Resume Analysis: Model did not return a valid output.');
      throw new Error('The AI model did not return a valid analysis. This might be due to an issue with the input file or the job description. Please try again.');
    }
    // Basic validation of the output structure, although Zod schema parsing handles this too
    if (typeof output.atsScore !== 'number' || !Array.isArray(output.suggestions)) {
        console.error('ATS Resume Analysis: Model output structure is invalid.', output);
        throw new Error('The AI model returned an invalid analysis format. Please try again.');
    }
    return output;
  }
);
