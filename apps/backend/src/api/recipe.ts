import { ApiResponse, Recipe } from '@recepturomat/data-model';
import { dataModel } from '../dataModel/dataModel';

export const getRecipe = async (recipeId: string): Promise<ApiResponse<Recipe>> => {
  const recipe = await dataModel.recipes.findOne({recipeId});
  console.log(recipe);

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

export const deleteRecipe = async (recipeId: string): Promise<ApiResponse<undefined>> => {
  await dataModel.recipes.deleteOne({recipeId});
  return {
    type: 'success',
    data: undefined
  }
};
