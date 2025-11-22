import { useRecipeList } from '../api/clientApi';
import { RecipeList } from './components';
import { ErrorMessage } from '../components/ErrorMessage';
import { Loading } from '@ui/loading';
import { ChangeEventHandler, useCallback, useMemo, useState } from 'react';
import { Button } from '@ui/forms/Button';
import { FaCircleXmark } from 'react-icons/fa6';

export function RecipesListPage() {
  const { recipeList, error } = useRecipeList();
  const [searchQuery, setSearchQuery] = useState('');

  const update: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  const filteredList = useMemo(() => {
    if (!recipeList) return [];
    if (searchQuery.length > 0) {
      return recipeList.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return recipeList;
  }, [recipeList, searchQuery]);

  if (error) {
    return <ErrorMessage error={error} />;
  }
  if (recipeList === undefined) return <Loading />;

  return (
    <>
      <div className="flex flex-col m-4 pb-4">
        <h1 className="text-3xl pb-4 font-bold">Receptury</h1>
        <div className="join w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={update}
            placeholder="Szukaj"
            className="input input-bordered join-item"
          />
          <Button className="btn-secondary join-item">
            <FaCircleXmark />
          </Button>
        </div>
      </div>
      <RecipeList recipeList={filteredList} />
    </>
  );
}

export default RecipesListPage;
