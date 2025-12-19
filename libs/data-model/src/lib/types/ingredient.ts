import { z } from 'zod';

export const IngredientSchema = z.object({
  name: z.string(),
  amount: z.number(),
  unit: z.literal(['g', 'ml', 'pcs']),
  recipeId: z.string().transform((value) => {
    if (!value ) return undefined;
    return value;
  }).refine(value => value !== 'SELECT').optional(),
})

export type Ingredient = z.infer<typeof IngredientSchema>;
