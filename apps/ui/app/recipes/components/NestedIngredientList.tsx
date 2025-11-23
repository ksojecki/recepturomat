import { IngredientList } from './IngredientList';
import { useRecalculatedRecipe } from '../useRecipe';
import { useEffect } from 'react';

type NestedIngredientListProps = { recipeId: string, recipeWeight: number }
export const NestedIngredientList = ( { recipeId, recipeWeight} : NestedIngredientListProps) => {
  const { recipe, dispatch } = useRecalculatedRecipe(recipeId);
  useEffect(() => {
    dispatch({ newWeight: recipeWeight })
  }, [dispatch, recipeWeight]);
  if (!recipe) return <div>Loading...</div>;
  return (
    <>
      <IngredientList recipe={recipe} />
    </>
  );
};
