export type Success<T> = { type: 'success'; data: T };

export type UnauthorizedError = {
  type: 'error';
  error: 'unauthorized';
  message: string;
};
export type ServerError = {
  type: 'error';
  error: 'server-error';
  message: string;
};

export type ApiError = UnauthorizedError | ServerError;

export type ApiResponse<T> = Success<T> | ApiError;
