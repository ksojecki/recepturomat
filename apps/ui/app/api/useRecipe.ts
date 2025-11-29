import { useQuery, } from '@tanstack/react-query';
import { query } from './query';
import { ApiResponse, Recipe } from '@recepturomat/data-model';
import { useAuthentication } from './authentication';

export const useRecipe = (id: string | undefined) => {
  const { token } = useAuthentication();

  return useQuery<Recipe>({
    queryKey: ['recipe', id],
    queryFn: async () => {
      const result = await query<ApiResponse<Recipe>, undefined>({
        endpoint: `recipe/${id}`,
        apiToken: token,
      });

      if(result.type === 'error') {
        throw result;
      }

      return result.data;
    },
    enabled: !!token && !!id,
    staleTime: Infinity,
  });
}
