import { Ingredient } from './ingredient';

export type Recipe = {
  name: string;
  recipeId: string;
  ingredients: Ingredient[];
  defaultWeight: number;
};

export type RecipeListEntry = Pick<Recipe, 'name' | 'recipeId'>;
