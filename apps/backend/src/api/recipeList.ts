import { ApiResponse, RecipeListEntry } from '@recepturomat/data-model';
import { MockOfRecipes } from '../mock';

export const getRecipeList = (): ApiResponse<RecipeListEntry[]> => {
  return {
    type: 'success',
    data: MockOfRecipes.map(q => ({ name: q.name, recipeId: q.recipeId }))
  };
};
