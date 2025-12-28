import RecipeForm from './components/RecipeForm.tsx';
import { useParams } from 'react-router';
import { useRecalculatedRecipe } from './useRecipe.ts';
import { Loading } from '@ui/loading.tsx';

export const EditRecipePage = () => {
  const { recipeId } = useParams();
  const { recipe } = useRecalculatedRecipe(recipeId);
  if (!recipe) return <Loading />;

  return <RecipeForm recipe={recipe}/>
}

export default EditRecipePage;
