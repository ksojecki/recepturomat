import { Link, useNavigate, useParams } from 'react-router';

import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowUp,
  FaSave,
  FaTrash,
} from 'react-icons/fa';
import { useRecalculatedRecipe } from './useRecipe';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { Button } from '@ui/forms/Button';
import { Loading } from '@ui/loading';
import { zodResolver } from '@hookform/resolvers/zod';
import { Recipe, RecipeSchema } from '@recepturomat/data-model';
import { FaCircleXmark } from 'react-icons/fa6';
import { NestedIngredientList } from './components/NestedIngredientList';
import { useRecipesList } from '../api/useRecipesList';


export const RecipePage = () => {
  const { recipeId } = useParams();
  const navigate= useNavigate();
  const { recipe } = useRecalculatedRecipe(recipeId);

  const { isSuccess, data } = useRecipesList();

  const { register, control, setValue, handleSubmit } = useForm<Recipe>({
    resolver: zodResolver(RecipeSchema),
    values: recipe,
    reValidateMode: 'onBlur',
  });

  const handler = handleSubmit((data) => {
    console.log(data);
  });

  const { fields, append, remove, move } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormProvider)
    name: 'ingredients', // unique name for your Field Array
  });

  const ingredients = useWatch({ control, name: 'ingredients' });

  if (!recipe) return (<Loading />);
  return (
    <form onSubmit={handler}>
    <div className="m-4">
      <div className="flex flex-col pb-4">
        <div className="flex flex-row space-x-1">
          <Button onClick={() => navigate(-1)}>
            <FaArrowLeft />
          </Button>
          <Link className={'btn'} to="/">
            <FaArrowUp />
          </Link>
          <input
            {...register('name')}
            className="input join-item flex-grow"
            placeholder="Tytuł"
          />
          <Link className="btn join-item" to={`/recipe/${recipeId}/`}>
            Anuluj
            <FaCircleXmark />
          </Link>
          <Button type="submit" className="btn btn-success join-item" >
            Zapisz
            <FaSave />
          </Button>
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        <label className="input flex flex-grow w-full">
          <span className="label">Waga produktu</span>
          <input {...register('defaultWeight')} placeholder="Nowa waga" />
          <span className="label">g</span>
        </label>
      </div>
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Przepis</li>
        {fields.map((field, index) => (
          <li
            className={`list-row ${
              field.recipeId ? 'bg-base-200' : 'bg-base-100'
            }`}
            key={field.name}
          >
            <div className="list-col-grow space-x-4 space-y-4">
              <label className="input ">
                <span className="label">Składnik</span>
                <input
                  {...register(`ingredients.${index}.name`)}
                  placeholder="Składnik"
                />
              </label>
              <label className="input">
                <span className="label">Ilość</span>
                <input
                  {...register(`ingredients.${index}.amount`)}
                  placeholder="Składnik"
                />
                <select {...register(`ingredients.${index}.unit`)}>
                  <option value={'g'}>g</option>
                  <option value={'pcs'}>sztuk</option>
                  <option value={'ml'}>ml</option>
                </select>
              </label>
              <label className="label">
                Przepis
                <input
                  type={"checkbox"}
                  className={"input-checkbox"}
                  checked={!!ingredients?.[index]?.recipeId && ingredients?.[index]?.recipeId !== ''}
                  onChange={(e) => {
                    if (e.target.checked) {
                      // enable selection: set to empty string so select shows the "Wybierz" option
                      setValue(`ingredients.${index}.recipeId`, 'SELECT');
                    } else {
                      // disable recipe reference
                      setValue(
                        `ingredients.${index}.recipeId`,
                        ''
                      );
                    }
                  }}
                />
              </label>
              {!!ingredients?.[index]?.recipeId && ingredients?.[index]?.recipeId !== '' &&
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
                <legend className="fieldset-legend">Przepis</legend>
                <div className="join">
                  <select
                    className="input join-item flex-grow"
                    {...register(`ingredients.${index}.recipeId`, {
                      disabled: !isSuccess
                    })}
                  >
                    <option value={'SELECT'}>Wybierz przepis</option>
                    { data?.map((recipe) => <option key={recipe.recipeId} value={recipe.recipeId}>{recipe.name}</option>) }
                  </select>
                  <button className="btn join-item"><FaArrowDown /></button>
                </div>

                {ingredients?.[index]?.recipeId !== 'SELECT' && (
                  <NestedIngredientList
                    recipeId={ingredients[index].recipeId}
                    requiredWeight={ingredients[index].amount}
                  />
                )}
              </fieldset>
              }
            </div>
            <div className="list-col join">
              <button
                className={'btn join-item'}
                onClick={() => {
                  if (index > 0) {
                    move(index, index - 1);
                  }
                }}
              >
                <FaArrowUp />
              </button>
              <button
                className={'btn join-item'}
                onClick={() => {
                  if (index < fields.length - 1) {
                    move(index, index + 1);
                  }
                }}
              >
                <FaArrowDown />
              </button>
              <button
                className={'btn btn-primary join-item'}
                onClick={() => {
                  remove(index);
                }}
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
        <li className={`list-row`} key={'newIngredient'}>
          <div className={`join`}>
            <button
              className="btn btn-primary item-join"
              onClick={() => {
                append({
                  name: '',
                  amount: 0,
                  unit: 'g',
                });
              }}
            >
              Nowy składnik
            </button>
          </div>
        </li>
      </ul>
    </div>
    </form>
  );
};

export default RecipePage;
