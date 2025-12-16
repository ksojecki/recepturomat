import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Recipe } from '@recepturomat/data-model';
import { useAuthentication } from './authentication';
import { useResponseChecker } from './useResponseChecker';
import { query } from './query';

export const useRecipe = (id: string | undefined) => {
  const { token } = useAuthentication();
  const { queryFn } = useResponseChecker<Recipe>(`recipe/${id}`);
  const queryClient = useQueryClient()
  const deleteRecord = useMutation({
    mutationKey: ['recipe', id],
    mutationFn: async () => {
      await query<undefined>({method: 'DELETE', endpoint: `recipe/${id}`, apiToken: token});
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['recipe'] });
    }

  });
  return {
    record: useQuery<Recipe | undefined>({
      queryKey: ['recipe', id],
      queryFn,
      enabled: !!token && !!id,
      staleTime: Infinity,
    }),
    deleteRecord
  };
}
