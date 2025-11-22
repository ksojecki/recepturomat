import { Handler } from 'express';
import { ServerError } from '@recepturomat/data-model';

export const useErrorHandler: Handler = (req, res, next) => {
  try {
    next();
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    const response: ServerError = {
      type: 'error',
      error: 'server-error',
      message: 'Request cannot be processed, see server logs for details',
    };
    res.status(500).send(response);
  }
};
