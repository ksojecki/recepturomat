const API_URL = 'https://localhost:3333/api';

type QueryParams<TPayload> = {
  endpoint: string;
  body?: TPayload;
  apiToken?: string;
};

export const query = async <TResponse, TPayload = undefined>({
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
