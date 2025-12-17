import { useQuery, } from '@tanstack/react-query';
import { RecipeListEntry } from '@recepturomat/data-model';
import { useAuthentication } from './authentication';
import { useApiCall } from './useApiCall';

export const useRecipesList = (searchString?: string) => {
  const { token } = useAuthentication();
  const { queryFn } = useApiCall<RecipeListEntry[]>(`recipe/list`);

  return useQuery<RecipeListEntry[] | undefined>({
    queryKey: ['recipe', 'list'],
    queryFn,
    select: (data) => {
      if(data === undefined) return undefined;
      const sorted = data.sort((a, b) => a.name.localeCompare(b.name));
      if(searchString) return sorted.filter(recipe => recipe.name.includes(searchString));
      return sorted;
    },
    enabled: !!token
  });
}
