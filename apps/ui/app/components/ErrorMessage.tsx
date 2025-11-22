import { ApiError } from '@recepturomat/data-model';
import { useEffect } from 'react';

type ErrorProps = {
  error: ApiError | Error;
};

export const ErrorMessage = ({ error }: ErrorProps) => {
  const { message, errorType } = useError(error);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="content-center h-[100%]">
      <div className="object-center grid grid-cols-1 p-4">
        <div className="rounded-xl bg-error p-4 text-error-content">
          <h1 className="text-3xl mb-4">
            <b>Error - {errorType}</b>
          </h1>
          <div className="bg-neutral text-neutral-content p-4">
            <pre>{message}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

const useError = (
  error: ApiError | Error
): { message: string; errorType: string } => {
  const errorResponse = error as ApiError;

  if (errorResponse?.type === 'error') {
    return { message: errorResponse.message, errorType: errorResponse.error };
  }

  return { message: JSON.stringify(error, null, 2), errorType: 'unknown' };
};
