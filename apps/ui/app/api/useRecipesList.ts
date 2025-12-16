import { useQuery, } from '@tanstack/react-query';
import { RecipeListEntry } from '@recepturomat/data-model';
import { useAuthentication } from './authentication';
import { useResponseChecker } from './useResponseChecker';

export const useRecipesList = () => {
  const { token } = useAuthentication();
  const { queryFn } = useResponseChecker<RecipeListEntry[]>(`recipe/list`);

  return useQuery<RecipeListEntry[] | undefined>({
    queryKey: ['recipe'],
    queryFn,
    enabled: !!token
  });
}
