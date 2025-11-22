import { useParams } from 'react-router';
import { useRecipe } from '../api/clientApi';
import { IngredientList } from './components/IngredientList';

export const RecipePage = () => {
  const { recipeId } = useParams();
  const { recipe } = useRecipe({ id: recipeId || '' });
  if (!recipe) return <div>Loading...</div>;
  return (
    <div className="m-4">
      <div className="flex flex-col pb-4">
        <h1 className="text-3xl pb-4 font-bold">{recipe.name}</h1>
        <div>
          <p>Przepis obliczony na {recipe.defaultWeight} g</p>
        </div>
      </div>
      <IngredientList recipe={recipe} />
    </div>
  );
};

export default RecipePage;
