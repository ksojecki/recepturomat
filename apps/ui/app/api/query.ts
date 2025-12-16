const API_URL = 'https://localhost:3333/api';
type Params = {
  endpoint: string;
  apiToken?: string;
};

type GetParams = Params & {
  method: 'GET';
};

type PostParams<TPayload> = Params & {
  body: TPayload;
  method: 'POST';
};

type DeleteParams = Params & { method: 'DELETE' };

type QueryParams<TPayload> = GetParams | PostParams<TPayload> | DeleteParams;

export const query = async <TResponse, TPayload = undefined>(params: QueryParams<TPayload>): Promise<TResponse> => {
  try {
    const headers = new Headers();

    const { endpoint, method, apiToken } = params;

    if (apiToken) {
      headers.append('Authorization', `Bearer ${apiToken}`);
    }

    if (params.method === 'POST') {
      headers.append('Content-Type', 'application/json');
    }

    const requestOptions: RequestInit = {
      headers,
      method,
      body: method === 'POST' ? JSON.stringify(params.body) : undefined,
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
