'use server';

import { generateHeartName } from '@/ai/flows/generate-heart-name';
import { z } from 'zod';

const schema = z.object({
  promptConditions: z.string().min(1, 'Prompt conditions cannot be empty.'),
});

type FormState = {
  message: string;
  heartName?: string;
  errors?: {
    promptConditions?: string[];
  };
};

export async function generateNameAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = schema.safeParse({
    promptConditions: formData.get('promptConditions'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid input.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await generateHeartName({ promptConditions: validatedFields.data.promptConditions });
    return { message: 'success', heartName: result.heartName };
  } catch (error) {
    console.error(error);
    return { message: 'An error occurred while generating the name. Please try again.' };
  }
}
