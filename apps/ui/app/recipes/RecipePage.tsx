import { Link, useParams } from 'react-router';
import { IngredientList } from './components/IngredientList';

import { FaArrowLeft, FaEdit, FaPrint, FaTrash } from 'react-icons/fa';
import { useRecalculatedRecipe } from './useRecipe';
import { useForm } from 'react-hook-form';

type AlteredWeight = {
  unit: 'g' | 'pcs';
  value: number | undefined;
};

export const RecipePage = () => {
  const { recipeId } = useParams();
  const { recipe, setNewWeight } = useRecalculatedRecipe(recipeId);

  const { register, watch } = useForm<AlteredWeight>({
    defaultValues: {
      unit: 'g',
      value: recipe?.defaultWeight
    }
  });

  watch((value) => {
    if(value.value === undefined) {
      return;
    }
    setNewWeight(value.value * (value.unit === 'g' ? 1 : 1000))
  })

  if (!recipe) return (<div>Loading...</div>);
  return (
    <div className="m-4">
      <div className="flex flex-col pb-4">
        <div className="flex flex-row space-x-1">
          <Link className={'btn'} to='/' ><FaArrowLeft /></Link>
          <h1 className="text-3xl pb-4 font-bold">{recipe.name} - {recipe.defaultWeight} g</h1>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="join w-full">
            <input {...register('value')} className="input join-item flex-grow" placeholder="Nowa waga"
            />
            <select {...register('unit')} className="select join-item w-[100px]">
              <option value={'g'}>g</option>
              <option value={'pcs'}>sztuk</option>
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
