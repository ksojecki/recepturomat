import { Link, useNavigate, useParams } from 'react-router';

import {
  FaArrowLeft,
  FaArrowUp,
  FaSave,
} from 'react-icons/fa';
import { useRecalculatedRecipe } from './useRecipe';
import { useForm } from 'react-hook-form';
import { Button } from '@ui/forms/Button';
import { Loading } from '@ui/loading';
import { zodResolver } from '@hookform/resolvers/zod';
import { Recipe, RecipeSchema } from '@recepturomat/data-model';
import { FaCircleXmark } from 'react-icons/fa6';


export const RecipePage = () => {
  const { recipeId } = useParams();
  const navigate= useNavigate();
  const { recipe } = useRecalculatedRecipe(recipeId);

  const { register } = useForm<Recipe>({
    resolver: zodResolver(RecipeSchema),
    values: recipe
  });

  if (!recipe) return (<Loading />);
  return (
    <div className="m-4">
      <div className="flex flex-col pb-4">
        <div className="flex flex-row space-x-1">
          <Button onClick={() => navigate(-1)}><FaArrowLeft /></Button>
          <Link className={'btn'} to='/' ><FaArrowUp /></Link>
          <input {...register('name')} className="input join-item flex-grow" placeholder="Tytuł" />
          <Link className="btn join-item" to={`/recipe/${recipeId}/`}>Anuluj<FaCircleXmark /></Link>
          <Button className="btn btn-success join-item">Zapisz<FaSave /></Button>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <label className="input join-item flex-grow w-full">
          <span className="label">Waga produktu</span>
          <input {...register('defaultWeight')} placeholder="Nowa waga" />
          <span className="label">g</span>
        </label>
      </div>

    </div>
  );
};

export default RecipePage;
