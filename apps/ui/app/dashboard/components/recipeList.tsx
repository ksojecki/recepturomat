import { RecipeListEntry } from '@recepturomat/data-model';

type DashboardProps = {
  recipeList: RecipeListEntry[];
};
export const RecipeList = ({ recipeList }: DashboardProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
      {recipeList.map((recipe) => (
        <div className="card bg-accent-content shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{recipe.name}</h2>
            <p></p>
            <div className="card-actions justify-end">
              <button className="btn">Zobacz</button>
              <button className="btn btn-primary">Drukuj</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
