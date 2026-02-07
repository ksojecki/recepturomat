import { UseFormRegister } from 'react-hook-form';
import { Recipe } from '@recepturomat/data-model';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import { NestedIngredientList } from '../NestedIngredientList.tsx';
import { useState } from 'react';
import { useTranslation } from '../../../i18n';

interface RecipeReferenceSectionProps {
  index: number;
  recipeId: string;
  requiredWeight: number;
  recipes: Array<{ recipeId: string; name: string }> | undefined;
  isSuccess: boolean;
  register: UseFormRegister<Recipe>;
}

export function RecipeReferenceSection({
  index,
  recipeId,
  requiredWeight,
  recipes,
  isSuccess,
  register,
}: RecipeReferenceSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const t = useTranslation();

  return (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
      <legend className="fieldset-legend">{t('recipeForm.recipe')}</legend>
      <div className="join">
        <select
          className="input join-item flex-grow"
          {...register(`ingredients.${index}.recipeId`, {
            disabled: !isSuccess,
          })}
        >
          <option value="SELECT">{t('recipeForm.selectRecipe')}</option>
          {recipes?.map((recipe) => (
            <option key={recipe.recipeId} value={recipe.recipeId}>
              {recipe.name}
            </option>
          ))}
        </select>
        <button disabled={recipeId === 'SELECT'} type="button" onClick={() => setIsExpanded(!isExpanded
        )} className="btn join-item">
          { isExpanded ? <FaArrowUp /> : <FaArrowDown /> }
        </button>
      </div>

      {recipeId !== 'SELECT' && isExpanded && (
        <NestedIngredientList
          recipeId={recipeId}
          requiredWeight={requiredWeight}
        />
      )}
    </fieldset>
  );
}

