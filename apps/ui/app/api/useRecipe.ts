import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Recipe } from '@recepturomat/data-model';
import { useAuthentication } from './authentication';
import { useApiCall } from './useApiCall';
import { query } from './query';

export const useRecipe = (id: string | undefined) => {
  const { token } = useAuthentication();
  const { queryFn } = useApiCall<Recipe>(`recipe/${id}`);
  const queryClient = useQueryClient()
  const deleteRecord = useMutation({
    mutationKey: ['recipe', id],
    mutationFn: async () => {
      await query<undefined>({method: 'DELETE', endpoint: `recipe/${id}`, apiToken: token});
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['recipe', 'list'] });
      await queryClient.setQueryData(['recipe', id], undefined);
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
