'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a name to inscribe within the hearts, optionally including 'hetanshi'.
 *
 * @exports generateHeartName - A function that generates a heart name with optional 'hetanshi' inclusion.
 * @exports GenerateHeartNameInput - The input type for the generateHeartName function.
 * @exports GenerateHeartNameOutput - The output type for the generateHeartName function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHeartNameInputSchema = z.object({
  promptConditions: z
    .string()
    .describe(
      'Conditions to consider when deciding whether to include the word \'hetanshi\'.' // Escaping special characters
    ),
});
export type GenerateHeartNameInput = z.infer<typeof GenerateHeartNameInputSchema>;

const GenerateHeartNameOutputSchema = z.object({
  heartName: z.string().describe('The generated name to inscribe within the heart.'),
});
export type GenerateHeartNameOutput = z.infer<typeof GenerateHeartNameOutputSchema>;

export async function generateHeartName(input: GenerateHeartNameInput): Promise<GenerateHeartNameOutput> {
  return generateHeartNameFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHeartNamePrompt',
  input: {schema: GenerateHeartNameInputSchema},
  output: {schema: GenerateHeartNameOutputSchema},
  prompt: `Generate a name to inscribe within a heart, considering the following conditions: {{{promptConditions}}}.  The name should be short and sweet.  Decide whether or not to include the word 'hetanshi' based on the conditions provided, and include it if and only if it makes sense.  If the user mentions hetanshi in the prompt conditions, then the generated name must include it as well.`,
});

const generateHeartNameFlow = ai.defineFlow(
  {
    name: 'generateHeartNameFlow',
    inputSchema: GenerateHeartNameInputSchema,
    outputSchema: GenerateHeartNameOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
