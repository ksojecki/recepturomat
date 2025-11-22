import { useRecipe } from '../../api/clientApi';
import { IngredientList } from './IngredientList';

type NestedIngredientListProps = { recipeId: string }
export const NestedIngredientList = ( { recipeId} : NestedIngredientListProps) => {
  const { recipe } = useRecipe({ id: recipeId });
  if (!recipe) return <div>Loading...</div>;
  return (
    <>
      <IngredientList recipe={recipe} />
    </>
  );
};
