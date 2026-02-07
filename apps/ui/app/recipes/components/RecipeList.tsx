import { RecipeListEntry } from '@recepturomat/data-model';
import { Link } from 'react-router';
import { useTranslation } from '../../i18n';

type DashboardProps = {
  recipeList: RecipeListEntry[];
};
export const RecipeList = ({ recipeList }: DashboardProps) => {
  const t = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
      {recipeList.map((recipe) => (
        <div key={recipe.recipeId} className="card bg-base-200 shadow-md">
          <div className="card-body">
            <h2 className="card-title">{recipe.name}</h2>
            <p></p>
            <div className="card-actions justify-end">
              <Link to={{pathname: `/recipe/${recipe.recipeId}`}} className="btn">{t('recipes.view')}</Link>
              <button className="btn btn-primary">{t('recipes.print')}</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
