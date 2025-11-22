import { useEffect, useRef, useState } from 'react';

const API_URL = 'https://localhost:3333/api';

export type QueryState = 'loading' | 'error' | 'received' | 'idle';

type QueryParams<TPayload> = {
  endpoint: string;
  body?: TPayload;
  apiToken?: string | null;
};

interface UseQueryParams<TPayload> extends QueryParams<TPayload> {
  isEnabled?: boolean;
}

/**
 * Used to watch changes in data model
 * @param isEnabled
 * @param apiToken
 * @param endpoint
 * @param body
 */
export const useQuery = <TResponse, TPayload = undefined>({
  isEnabled = true,
  apiToken,
  endpoint,
  body,
}: UseQueryParams<TPayload>) => {
  const [data, setData] = useState<TResponse>();
  const [queryState, setQueryState] = useState<QueryState>('idle');
  const [error, setError] = useState<Error | undefined>(undefined);
  const timestamp = useRef(0);

  useEffect(() => {
    if (
      !isEnabled ||
      queryState !== 'idle' ||
      Date.now() - timestamp.current < 5000
    )
      return;
    setQueryState('loading');
    timestamp.current = Date.now();
    query<TResponse, TPayload>({ apiToken, endpoint, body })
      .then((data) => {
        setQueryState('received');
        setData(data);
      })
      .catch((error) => {
        setQueryState('error');
        setError({
          name: 'Query Processing Error',
          message: `Cannot process request to ${endpoint}`,
          cause: error,
        });
      });
  }, [apiToken, endpoint, body, isEnabled, queryState]);

  return { data, queryState, queryError: error };
};

export const query = async <TResponse, TPayload>({
  body,
  endpoint,
  apiToken,
}: QueryParams<TPayload>): Promise<TResponse> => {
  try {
    const headers = new Headers();

    if (apiToken) {
      headers.append('Authorization', `Bearer ${apiToken}`);
    }

    if (body) {
      headers.append('Content-Type', 'application/json');
    }

    const requestOptions: RequestInit = {
      headers,
      method: body ? 'POST' : 'GET',
      body: body ? JSON.stringify(body) : undefined,
      mode: 'cors',
      cache: 'no-cache',
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    };

    const response = await fetch(`${API_URL}/${endpoint}`, requestOptions);
    return (await response.json()) as TResponse;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
