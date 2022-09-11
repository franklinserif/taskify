/**
 * @module middlewares/error.handler
 */
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { Boom } from "@hapi/boom";
import { TypeORMError } from "typeorm";

/**
 * It will handler erros if it's a boom error
 * otherwise it will response with the error it self
 * @param {Boom} err
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} _next
 * @returns {void}
 */

export const boomErrorHandler: ErrorRequestHandler = (
  err: Boom,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err.isBoom) {
    const { output } = err;

    res.status(output.statusCode).json(output.payload);
  } else {
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }
};

/**
 * It handle all orm errors
 */
export const ormErrorHandler: ErrorRequestHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof TypeORMError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      stack: err.stack,
    });
  } else {
    next(err);
  }
};
