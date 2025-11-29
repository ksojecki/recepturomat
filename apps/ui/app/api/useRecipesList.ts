import { useQuery, } from '@tanstack/react-query';
import { query } from './query';
import { ApiResponse, RecipeListEntry } from '@recepturomat/data-model';
import { useAuthentication } from './authentication';

export const useRecipesList = () => {
  const { token } = useAuthentication();

  return useQuery<RecipeListEntry[]>({
    queryKey: ['recipe', 'list'],
    queryFn: async () => {
      const result = await query<ApiResponse<RecipeListEntry[]>, undefined>({
        endpoint: 'recipe/list',
        apiToken: token,
      });

      if(result.type === 'error') {
        throw result;
      }

      return result.data;
    },
    enabled: !!token
  });
}
