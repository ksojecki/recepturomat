import { Link, useNavigate, useParams } from 'react-router';
import { IngredientList } from './components/IngredientList';

import {
  FaArrowLeft,
  FaArrowUp,
  FaEdit,
  FaPrint,
  FaTrash,
} from 'react-icons/fa';
import { useRecalculatedRecipe } from './useRecipe';
import { useForm } from 'react-hook-form';
import { FaCircleXmark } from 'react-icons/fa6';
import { Button } from '@ui/forms/Button';
import { Loading } from '@ui/loading';

type AlteredWeight = {
  unit: 'g' | 'pcs';
  value: number | undefined;
};

export const RecipePage = () => {
  const { recipeId } = useParams();
  const navigate= useNavigate();
  const { recipe, setNewWeight, reset } = useRecalculatedRecipe(recipeId);

  const { register, watch, setValue } = useForm<AlteredWeight>({
    defaultValues: {
      unit: 'g',
      value: undefined
    }
  });

  watch(({ value, unit }) => {
    if (value === undefined || value <=0 || isNaN(value)) {
      reset();
      return;
    }
    setNewWeight(value * (unit === 'g' ? 1 : 1000));
  });

  if (!recipe) return (<Loading />);
  return (
    <div className="m-4">
      <div className="flex flex-col pb-4">
        <div className="flex flex-row space-x-1">
          <Button onClick={() => navigate(-1)}><FaArrowLeft /></Button>
          <Link className={'btn'} to='/' ><FaArrowUp /></Link>
          <h1 className="text-3xl pb-4 font-bold flex-grow">{recipe.name} - {recipe.weight} g</h1>
          <button className="btn btn-success join-item">Drukuj<FaPrint /></button>
          <button className="btn join-item">Edytuj<FaEdit /></button>
          <button className="btn join-item">Usuń<FaTrash /></button>
        </div>
        <div className="flex flex-col space-y-2">
          <div className="join w-full">
            <input {...register('value')} className="input join-item flex-grow" placeholder="Nowa waga"
            />
            <select {...register('unit')} className="select join-item w-[100px]">
              <option value={'g'}>g</option>
              <option value={'pcs'}>sztuk</option>
            </select>
            <Button className="btn-primary join-item" onClick={() => {
              setValue('value', undefined);
            }}  >
              <FaCircleXmark />
            </Button>
          </div>
        </div>
      </div>
      <IngredientList recipe={recipe} />
    </div>
  );
};

export default RecipePage;
