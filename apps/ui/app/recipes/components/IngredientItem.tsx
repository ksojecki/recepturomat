import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Recipe, Ingredient } from '@recepturomat/data-model';
import { RecipeCheckbox } from './RecipeCheckbox';
import { RecipeReferenceSection } from './RecipeReferenceSection';
import { IngredientActions } from './IngredientActions';

interface IngredientItemProps {
  ingredient: Ingredient;
  index: number;
  totalItems: number;
  recipes: Array<{ recipeId: string; name: string }> | undefined;
  isRecipesLoaded: boolean;
  register: UseFormRegister<Recipe>;
  setValue: UseFormSetValue<Recipe>;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
  onRemove: (index: number) => void;
}

export function IngredientItem({
  ingredient,
  index,
  totalItems,
  recipes,
  isRecipesLoaded,
  register,
  setValue,
  onMoveUp,
  onMoveDown,
  onRemove,
}: IngredientItemProps) {
  if(ingredient === undefined) {
    return null;
  }
  const isRecipeLinked =
    !!ingredient?.recipeId && ingredient?.recipeId !== '';

  return (
    <li
      className={`list-row ${
        ingredient.recipeId ? 'bg-base-200' : 'bg-base-100'
      }`}
      key={ingredient.name}
    >
      <div className="list-col-grow space-x-4 space-y-4">
        <label className="input">
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
            <option value="g">g</option>
            <option value="pcs">sztuk</option>
            <option value="ml">ml</option>
          </select>
        </label>
        <RecipeCheckbox
          index={index}
          isRecipeLinked={isRecipeLinked}
          register={register}
          setValue={setValue}
        />
        {isRecipeLinked && ingredient.recipeId !== undefined &&(
          <RecipeReferenceSection
            index={index}
            recipeId={ingredient.recipeId}
            requiredWeight={ingredient.amount}
            recipes={recipes}
            isSuccess={isRecipesLoaded}
            register={register}
          />
        )}
      </div>
      <IngredientActions
        index={index}
        totalItems={totalItems}
        onMoveUp={onMoveUp}
        onMoveDown={onMoveDown}
        onRemove={onRemove}
      />
    </li>
  );
}

