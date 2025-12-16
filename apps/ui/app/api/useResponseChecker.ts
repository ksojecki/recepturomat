import { ApiResponse } from '@recepturomat/data-model';
import { query } from './query';
import { useAuthentication } from './authentication';
import { useCallback } from 'react';

export const useResponseChecker = <T>(endpoint: string) => {
  const { token, logout } = useAuthentication();
  const queryFn = useCallback(async () => {
    const result = await query<ApiResponse<T>>({
      endpoint,
      apiToken: token,
    });

    if(result.type === 'success') {
      return result.data;
    }

    if(result.error === 'unauthorized') {
      logout();
      return;
    }

    throw result;
  }, [endpoint, logout, token])

  return {
    queryFn
  }
}
