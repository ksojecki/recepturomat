import { Recipe } from '@recepturomat/data-model';
import { IngredientEntry } from './IngredientEntry';

type IngredientListProps = { recipe: Recipe };
export const IngredientList = ({ recipe }: IngredientListProps) => (
  <ul className="list bg-base-100 rounded-box shadow-md">
    <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
      Przeliczony przepis
    </li>
    {recipe.ingredients.map((ingredient) => (
      <IngredientEntry key={ingredient.name} ingredient={ingredient} />
      )
    )}
  </ul>
)
