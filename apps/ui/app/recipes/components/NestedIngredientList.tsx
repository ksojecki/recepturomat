import { IngredientList } from './IngredientList';
import { useRecalculatedRecipe } from '../useRecipe';
import { useEffect } from 'react';

type NestedIngredientListProps = { recipeId: string, requiredWeight: number }
export const NestedIngredientList = ( { recipeId, requiredWeight} : NestedIngredientListProps) => {
  const { recipe, setNewWeight } = useRecalculatedRecipe(recipeId);
  useEffect(() => {
    setNewWeight(requiredWeight)
  }, [setNewWeight, requiredWeight]);
  if (!recipe) return <div>Loading...</div>;
  return (
    <IngredientList recipe={recipe} />
  );
};
