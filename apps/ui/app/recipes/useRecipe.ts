import { useRecipe } from '../api/clientApi';
import { useEffect, useReducer } from 'react';
import { AlteredRecipe } from './types';

export const useRecalculatedRecipe = (id: string | undefined) => {
  const { recipe } = useRecipe({ id: id || '' });

  const [value, dispatch] = useReducer((previous: AlteredRecipe | undefined, action: 'reset' | { newWeight: number }) => {
    if(action === 'reset') {
      return recipe ? {
        ...recipe,
        weight: recipe.defaultWeight
      } : undefined;
    }

    if(!action.newWeight) return previous;

    if (recipe) {
      const { ingredients, defaultWeight, ...rest } = recipe;
      const weight = action.newWeight ?? previous?.weight ?? recipe.defaultWeight ?? 0;
      const ratio = weight / defaultWeight
      const recalculatedIngredients = ingredients.map(ingredient => ({
        ...ingredient,
        amount: ingredient.amount * ratio
      }))

      return {
        ingredients: recalculatedIngredients,
        defaultWeight,
        ...rest,
        weight,
      } satisfies AlteredRecipe;
    }
    return undefined;
  }, undefined)

  useEffect(() => {
    if(recipe) dispatch('reset')
  }, [recipe, id])

  return {
    recipe: value,
    dispatch
  }
};
