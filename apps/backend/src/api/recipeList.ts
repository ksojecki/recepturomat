import { ApiResponse, RecipeListEntry } from '@recepturomat/data-model';
import { dataModel } from '../dataModel/dataModel';

export const getRecipeList = async (): Promise<ApiResponse<RecipeListEntry[]>> => {
  const recipes = await dataModel.recipes.find().toArray();

  return {
    type: 'success',
    data: recipes.map(q => ({ name: q.name, recipeId: q.recipeId }))
  };
};
