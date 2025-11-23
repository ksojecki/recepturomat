import { Link, useParams } from 'react-router';
import { IngredientList } from './components/IngredientList';

import { FaArrowLeft } from 'react-icons/fa';
import { useRecalculatedRecipe } from './useRecipe';
import { TextInput } from '@ui/forms/textInput';

export const RecipePage = () => {
  const { recipeId } = useParams();
  const { recipe, dispatch } = useRecalculatedRecipe(recipeId);

  if (!recipe) return <div>Loading...</div>;
  return (
    <div className="m-4">
      <div className="flex flex-col pb-4">
        <div className="flex flex-row space-x-1">
          <Link className={'btn'} to='/' ><FaArrowLeft /></Link> <h1 className="text-3xl pb-4 font-bold">{recipe.name}</h1>
        </div>
        <div>
          <TextInput
            label={'Gramatura [g]'}
            min="1"
            value={recipe.weight}
            onChange={(e) => dispatch({ newWeight: Number(e.target.value)})}
            type={'number'}
          />
        </div>
      </div>
      <IngredientList recipe={recipe} />
    </div>
  );
};

export default RecipePage;
