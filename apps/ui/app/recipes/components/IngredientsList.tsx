import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  useFieldArray,
  useWatch,
} from 'react-hook-form';
import { Recipe } from '@recepturomat/data-model';
import { IngredientItem } from './IngredientItem';

interface IngredientsListProps {
  control: Control<Recipe>;
  register: UseFormRegister<Recipe>;
  setValue: UseFormSetValue<Recipe>;
  recipes: Array<{ recipeId: string; name: string }> | undefined;
  isRecipesLoaded: boolean;
}

export function IngredientsList({
  control,
  register,
  setValue,
  recipes,
  isRecipesLoaded,
}: IngredientsListProps) {
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'ingredients',
  });

  const ingredients = useWatch({ control, name: 'ingredients' });

  return (
    <ul className="list bg-base-100 rounded-box shadow-md">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Przepis</li>
      {fields.map((field, index) => (
        <IngredientItem
          key={field.id}
          ingredient={ingredients[index]}
          index={index}
          totalItems={fields.length}
          recipes={recipes}
          isRecipesLoaded={isRecipesLoaded}
          register={register}
          setValue={setValue}
          onMoveUp={(idx) => move(idx, idx - 1)}
          onMoveDown={(idx) => move(idx, idx + 1)}
          onRemove={(idx) => remove(idx)}
        />
      ))}
      <li className="list-row" key="newIngredient">
        <div className="join">
          <button
            className="btn btn-primary item-join"
            type="button"
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
  );
}

