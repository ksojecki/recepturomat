import { IngredientSchema } from './ingredient';
import { z } from 'zod';

export type RecipeListEntry = Pick<Recipe, 'name' | 'recipeId'>;

export const RecipeSchema = z.object({
  name: z.string(),
  recipeId: z.string(),
  ingredients: z.array(IngredientSchema),
  defaultWeight: z.number(),
});

export type Recipe = z.infer<typeof RecipeSchema>;
