import { UnauthorizedError } from './types/response';

/**
 * Checks if the error is an UnauthorizedError.
 * @param error
 */
export const isUnauthorized = (
  error: UnauthorizedError | unknown
): error is UnauthorizedError => {
  const errorResponse = error as UnauthorizedError;
  return (
    errorResponse?.type === 'error' && errorResponse?.error === 'unauthorized'
  );
};
