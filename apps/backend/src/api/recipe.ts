import { ApiResponse, Recipe } from '@recepturomat/data-model';
import { MockOfRecipes } from '../mock';

export const getRecipe = (id: string): ApiResponse<Recipe> => {
  const recipe = MockOfRecipes.find(q => q.recipeId === id)
  if (!recipe) {
    return {
      type: 'error',
      error: 'server-error',
      message: 'Recipe not found',
    }
  }

  return {
    type: 'success',
    data: recipe
  }
};
