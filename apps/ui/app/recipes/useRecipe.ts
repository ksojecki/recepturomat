
import { useCallback, useEffect, useReducer } from 'react';
import { AlteredRecipe } from './types';
import { useRecipe } from '../api/useRecipe';

type Action = {
  type: 'reset' | 'recalculate'
} | {
  type: 'newWeight',
  newWeight: number
}

type RecipeState = AlteredRecipe | Pick<AlteredRecipe, 'weight'> | undefined

const isAlteredRecipe = (value: unknown): value is AlteredRecipe => {
  return typeof value === 'object' && value !== null && 'ingredients' in value;
}

export const useRecalculatedRecipe = (id: string | undefined) => {
  const { record, deleteRecord } = useRecipe(id);
  const recipe = record.data;

  const [value, dispatch] = useReducer((previous: RecipeState | undefined, action: Action) => {
    if(action.type === 'reset' ||
      (action.type === 'recalculate' && previous === undefined)) {
      return recipe ? {
        ...recipe,
        weight: recipe.defaultWeight
      } : undefined;
    }

    if(action.type === 'newWeight' && previous?.weight === action.newWeight) return previous;

    if(!recipe && action.type === 'newWeight') {
      return {
        weight: action.newWeight
      };
    }

    if(!recipe) return undefined;

    const getWeight = (): number => {
      if(action.type === 'newWeight') return action.newWeight;
      if(action.type === 'recalculate' && previous) return previous.weight;
      return recipe.defaultWeight;
    };

    const weight = getWeight();

    const { ingredients, defaultWeight, ...rest } = recipe;
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
  }, undefined)

  useEffect(() => {
    if(recipe) dispatch({ type: 'recalculate'})
  }, [recipe, id])

  return {
    recipe: isAlteredRecipe(value) ? value : undefined,
    deleteRecord,
    reset: useCallback(() =>
      dispatch({ type: 'reset' }),
      [dispatch]),
    setNewWeight: useCallback((newWeight: number) =>
      dispatch({ type: 'newWeight', newWeight }),
      [dispatch])
  }
};
