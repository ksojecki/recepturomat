import { RequestHandler } from 'express';

/**
 * Middleware that allows cors requests from any origin.
 * @param req
 * @param res
 * @param next
 */
export const allowCorsRequests: RequestHandler = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://local.dev:4200');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};
