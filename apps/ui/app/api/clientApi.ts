import {
  ApiError,
  ApiResponse,
  Recipe,
  RecipeListEntry,
} from '@recepturomat/data-model';
import { useQuery } from './query';
import { useAuthentication } from './authentication';
import { useEffect, useState } from 'react';

type EndpointName = `recipe/${string}` | 'recipe/list' | 'ingredient';

const useApi = <T extends object>(endpoint: EndpointName) => {
  const { token, logout } = useAuthentication();
  const [error, setError] = useState<Error | ApiError | undefined>(undefined);
  const [payload, setPayload] = useState<T | undefined>(undefined);
  const { data, queryState, queryError } = useQuery<ApiResponse<T>>({
    endpoint,
    apiToken: token,
    isEnabled: !!token,
  });
  useEffect(() => {
    if (queryState === 'idle') {
      setError(undefined);
      setPayload(undefined);
      return;
    }

    if (queryState === 'loading') {
      setError(undefined);
      return;
    }

    if (queryState === 'error') {
      setError(queryError as Error);
      return;
    }

    if (data?.type === 'error') {
      if (data.error === 'unauthorized') {
        logout();
      }
      setError(data);
      return;
    }
    if (data?.type === 'success' && data.data !== undefined) {
      setError(undefined);
      setPayload(data.data);
      return;
    }
    setError({ name: 'clientApiError', message: 'Invalid data envelope' });
  }, [data, logout, queryError, queryState]);
  return { payload, error };
};

export const useRecipeList = () => {
  const apiParams = useApi<RecipeListEntry[]>('recipe/list');
  return { recipeList: apiParams.payload, error: apiParams.error };
};

export const useRecipe = ({ id }: { id: string }) => {
  const apiParams = useApi<Recipe>(`recipe/${id}`);
  return { recipe: apiParams.payload, error: apiParams.error };
};
