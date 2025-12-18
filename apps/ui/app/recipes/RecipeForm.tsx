import { Link, useNavigate, useParams } from 'react-router';

import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowUp,
  FaSave,
  FaTrash,
} from 'react-icons/fa';
import { useRecalculatedRecipe } from './useRecipe';
import { useFieldArray, useForm } from 'react-hook-form';
import { Button } from '@ui/forms/Button';
import { Loading } from '@ui/loading';
import { zodResolver } from '@hookform/resolvers/zod';
import { Recipe, RecipeSchema } from '@recepturomat/data-model';
import { FaCircleXmark } from 'react-icons/fa6';


export const RecipePage = () => {
  const { recipeId } = useParams();
  const navigate= useNavigate();
  const { recipe } = useRecalculatedRecipe(recipeId);

  const { register, control, formState } = useForm<Recipe>({
    resolver: zodResolver(RecipeSchema),
    values: recipe,
    reValidateMode: 'onBlur'
  });

  const { fields, append, remove, move } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: 'ingredients', // unique name for your Field Array
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
        <label className="input flex-grow w-full">
          <span className="label">Waga produktu</span>
          <input {...register('defaultWeight')} placeholder="Nowa waga" />
          <span className="label">g</span>
        </label>
      </div>
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
          Przeliczony przepis
        </li>
        {fields.map((field, index) => (
          <li className={`list-row ${field.recipeId ? 'bg-base-200' : 'bg-base-100'}`} key={field.name}>
            <div className="list-col-grow space-x-4">
              <label className="input ">
                <span className="label">Składnik</span>
                <input {...register(`ingredients.${index}.name`)} placeholder="Składnik" />
              </label>
              <label className="input">
                <span className="label">Ilość</span>
                <input {...register(`ingredients.${index}.amount`)} placeholder="Składnik" />
                <select {...register(`ingredients.${index}.unit`)}>
                  <option value={'g'}>g</option>
                  <option value={'pcs'}>sztuk</option>
                  <option value={'ml'}>ml</option>
                </select>
              </label>
            </div>
            <div className='list-col join'>
              <button className={'btn join-item'} onClick={() => {
                if(index > 1 && formState.isValid) {
                  move(index, index - 1);
                }
              }}><FaArrowUp/></button>
              <button className={'btn join-item'} onClick={() => {
                if(index < fields.length - 1 && formState.isValid) {
                  move(index, index + 1);
                }
              }}><FaArrowDown/></button>
              <button className={'btn btn-primary join-item'} onClick={() => {
                remove(index);
              }} ><FaTrash/></button>
            </div>
          </li>
          )
        )}
        <li className={`list-row`} key={'newIngredient'}>
          <div className={`join`} >
            <button className='btn btn-primary item-join' onClick={() => {
              append({
                name: '',
                amount: 0,
                unit: 'g'
              })
            }}>Nowy składnik</button>
          </div>
        </li>

      </ul>
    </div>
  );
};

export default RecipePage;
