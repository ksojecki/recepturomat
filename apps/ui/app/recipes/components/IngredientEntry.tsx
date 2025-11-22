import { NestedIngredientList } from './NestedIngredientList';
import { FaArrowDown, FaArrowRight, FaArrowUp } from 'react-icons/fa';
import { Ingredient } from '@recepturomat/data-model';
import { useState } from 'react';
import { Link } from 'react-router';

type IngredientProps = { ingredient: Ingredient }
export const IngredientEntry = ({ ingredient}: IngredientProps) => {
  const color = ingredient.recipeId ? 'bg-accent-content' : 'bg-accent-primary';
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <li className={`list-row ${color}`} key={ingredient.name}>
      <div className="list-col-grow">
        <div>{ingredient.name}</div>
        <div className="text-xs uppercase font-semibold opacity-60">
          {ingredient.amount} {ingredient.unit}
        </div>
      </div>
      {
        ingredient.recipeId && <>
        { isExpanded ? <div className="list-col-wrap text-xs">
            <NestedIngredientList recipeId={ingredient.recipeId} />
          </div> : null }
          <button className="btn btn-square btn-ghost" onClick={() => setIsExpanded(!isExpanded)}>
            { isExpanded ?  <FaArrowUp /> : <FaArrowDown /> }
          </button>
          <Link to={`/recipe/${ingredient.recipeId}`} className="btn btn-square btn-ghost">
            <FaArrowRight />
          </Link>
        </>
      }
    </li>
  )
}
