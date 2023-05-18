import { getReasonPhrase, StatusCodes } from "http-status-codes";
import * as express from "express";

export interface IError {
  status?: number;
  code?: number;
  message?: string;
}
/**
 * NOT_FOUND(404) middleware to catch error response
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 */
export function notFoundErrorHandler(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    error: {
      code: StatusCodes.NOT_FOUND,
      message: getReasonPhrase(StatusCodes.NOT_FOUND),
    },
  });
}

/**
 * Generic error response middleware
 *
 * @param  {object}   err
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 */
export function errorHandler(
  err: IError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: {
      code: err.code || StatusCodes.INTERNAL_SERVER_ERROR,
      message:
        err.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    },
  });
}
