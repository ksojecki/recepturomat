import { z } from 'zod';

export const IngredientSchema = z.object({
  name: z.string(),
  amount: z.number(),
  unit: z.literal(['g', 'ml', 'pcs']),
})

export type Ingredient = z.infer<typeof IngredientSchema>;
