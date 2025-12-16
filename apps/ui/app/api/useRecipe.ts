import { useQuery, } from '@tanstack/react-query';
import { Recipe } from '@recepturomat/data-model';
import { useAuthentication } from './authentication';
import { useResponseChecker } from './useResponseChecker';

export const useRecipe = (id: string | undefined) => {
  const { token } = useAuthentication();
  const { queryFn } = useResponseChecker<Recipe>(`recipe/${id}`);

  return useQuery<Recipe | undefined>({
    queryKey: ['recipe', id],
    queryFn,
    enabled: !!token && !!id,
    staleTime: Infinity,
  });
}
