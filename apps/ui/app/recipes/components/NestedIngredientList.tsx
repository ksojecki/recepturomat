import { IngredientList } from './IngredientList';
import { useRecalculatedRecipe } from '../useRecipe';
import { useEffect } from 'react';

type NestedIngredientListProps = { recipeId: string, requiredWeight: number }
export const NestedIngredientList = ( { recipeId, requiredWeight} : NestedIngredientListProps) => {
  const { recipe, dispatch } = useRecalculatedRecipe(recipeId);
  useEffect(() => {
    dispatch({ newWeight: requiredWeight })
  }, [dispatch, requiredWeight]);
  if (!recipe) return <div>Loading...</div>;
  return (
    <IngredientList recipe={recipe} />
  );
};
