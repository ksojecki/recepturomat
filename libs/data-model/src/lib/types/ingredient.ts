import { z } from 'zod';

export const IngredientSchema = z.object({
  name: z.string(),
  amount: z.number(),
  unit: z.literal(['g', 'ml', 'pcs']),
  recipeId: z.string().optional(),
})

export type Ingredient = z.infer<typeof IngredientSchema>;
