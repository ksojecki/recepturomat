import { RecipeList } from './components';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loading } from '@ui/loading';
import { ChangeEventHandler, useCallback, useState } from 'react';
import { Button } from '@ui/forms/Button';
import { FaCircleXmark, FaFileLines } from 'react-icons/fa6';
import { useRecipesList } from '../api/useRecipesList';
import { RecipeListEntry } from '@recepturomat/data-model';

const EMPTY_RECIPE_LIST: RecipeListEntry[] = [];

export function RecipesListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, error, isLoading } = useRecipesList(searchQuery.length > 0 ? searchQuery : undefined);
  const update: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (isLoading) return <Loading />;

  return (
    <>
      <div className="flex flex-col m-4 pb-4">
        <div className="flex">
          <h1 className="text-3xl pb-4 font-bold flex-grow">Receptury</h1>
          <Button className="join-item">
            Dodaj przepis
            <FaFileLines />
          </Button>
        </div>

        <div className="join w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={update}
            placeholder="Szukaj"
            className="input input-bordered join-item flex-grow"
          />
          <Button className="btn-primary join-item" onClick={() => setSearchQuery('')}  >
            <FaCircleXmark />
          </Button>
        </div>
      </div>
      <RecipeList recipeList={data || EMPTY_RECIPE_LIST} />
    </>
  );
}

export default RecipesListPage;
