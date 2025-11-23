import { Link, useParams } from 'react-router';
import { IngredientList } from './components/IngredientList';

import { FaArrowLeft, FaEdit, FaPrint, FaTrash } from 'react-icons/fa';
import { useRecalculatedRecipe } from './useRecipe';

export const RecipePage = () => {
  const { recipeId } = useParams();
  const { recipe, dispatch } = useRecalculatedRecipe(recipeId);

  if (!recipe) return <div>Loading...</div>;
  return (
    <div className="m-4">
      <div className="flex flex-col pb-4">
        <div className="flex flex-row space-x-1">
          <Link className={'btn'} to='/' ><FaArrowLeft /></Link>
          <h1 className="text-3xl pb-4 font-bold">{recipe.name} - {recipe.defaultWeight} g</h1>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="join w-full">
            <input className="input join-item flex-grow" placeholder="Nowa waga"
              onChange={(e) => {
                if(e.target.value === '') {
                  dispatch('reset')
                  return;
                }
                const value =  Number(e.target.value);
                if(isNaN(value)) return;
                dispatch({ newWeight: value});
              }}
            />
            <select className="select join-item w-[100px]">
              <option selected>g</option>
              <option>sztuk</option>
            </select>
            <button className="btn btn-success join-item">Drukuj<FaPrint /></button>
            <button className="btn join-item">Edytuj<FaEdit /></button>
            <button className="btn join-item">Usuń<FaTrash /></button>
          </div>
        </div>
      </div>
      <IngredientList recipe={recipe} />
    </div>
  );
};

export default RecipePage;
