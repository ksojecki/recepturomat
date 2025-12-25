import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Recipe } from '@recepturomat/data-model';

interface RecipeCheckboxProps {
  index: number;
  isRecipeLinked: boolean;
  register: UseFormRegister<Recipe>;
  setValue: UseFormSetValue<Recipe>;
}

export function RecipeCheckbox({
  index,
  isRecipeLinked,
  setValue,
}: RecipeCheckboxProps) {
  return (
    <label className="label">
      Przepis
      <input
        type="checkbox"
        className="input-checkbox"
        checked={isRecipeLinked}
        onChange={(e) => {
          if (e.target.checked) {
            // Enable selection: set to 'SELECT' so select shows the "Wybierz" option
            setValue(`ingredients.${index}.recipeId`, 'SELECT');
          } else {
            // Disable recipe reference
            setValue(`ingredients.${index}.recipeId`, '');
          }
        }}
      />
    </label>
  );
}

