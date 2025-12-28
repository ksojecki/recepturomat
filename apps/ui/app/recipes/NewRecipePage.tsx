import RecipeForm from './components/RecipeForm.tsx';
import { Recipe } from '@recepturomat/data-model';

export const NewRecipePage = () => {
  const recipe: Recipe = {
    defaultWeight: 1000, ingredients: [], recipeId: 'new',
    name: ''
  }
  return <RecipeForm recipe={recipe}/>
}

export default NewRecipePage;
