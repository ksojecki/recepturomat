import { ApiResponse, RecipeListEntry } from '@recepturomat/data-model';

export const getRecipeList = (): ApiResponse<RecipeListEntry[]> => {
  return {
    type: 'success',
    data: [
      { recipeId: '1', name: 'Sernik baskijski' },
      { recipeId: '2', name: 'Sernik z rodzynkami' },
      { recipeId: '3', name: 'Sernik babci' },
      { recipeId: '4', name: 'Cremo 1' },
      { recipeId: '5', name: 'Francuz z białym makiem' },
    ],
  };
};
