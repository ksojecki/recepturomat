import { useParams } from 'react-router';
import { useRecalculatedRecipe } from './useRecipe';
import { Loading } from '@ui/loading';
import { useRecipesList } from '../api/useRecipesList';
import { RecipeHeader } from './components/RecipeHeader';
import { RecipeWeightSection } from './components/RecipeWeightSection';
import { IngredientsList } from './components/IngredientsList';
import { useRecipeForm } from './hooks/useRecipeForm';


export const RecipePage = () => {
  const { recipeId } = useParams();
  const { recipe } = useRecalculatedRecipe(recipeId);
  const { isSuccess, data } = useRecipesList();

  const { register, control, setValue, onSubmit } = useRecipeForm(recipe);

  if (!recipe) return <Loading />;

  return (
    <form onSubmit={onSubmit}>
      <div className="m-4">
        <RecipeHeader recipeId={recipeId} register={register} />
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

export default RecipePage;
