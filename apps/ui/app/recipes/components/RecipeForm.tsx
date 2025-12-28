import { useRecipesList } from '../../api/useRecipesList.ts';
import { RecipeHeader } from './RecipeHeader.tsx';
import { RecipeWeightSection } from './RecipeWeightSection.tsx';
import { IngredientsList } from './IngredientsList.tsx';
import { useRecipeForm } from '../hooks/useRecipeForm.ts';
import { Recipe } from '@recepturomat/data-model';

export type RecipeFormProps = { recipe: Recipe };

export const RecipeForm = ({recipe}: RecipeFormProps) => {
  const { isSuccess, data } = useRecipesList();
  const { register, control, setValue, onSubmit } = useRecipeForm(recipe);
  return (
    <form onSubmit={onSubmit}>
      <div className="m-4">
        <RecipeHeader recipeId={recipe.recipeId} register={register} />
        <RecipeWeightSection register={register} />
        <IngredientsList
          control={control}
          register={register}
          setValue={setValue}
          recipes={data}
          isRecipesLoaded={isSuccess}
        />
      </div>
    </form>
  );
};

export default RecipeForm;
