/**
 * This module contains all middleware
 * that validate data
 * @module middleware/validator
 * @requires boom
 */
import { Response, Request, NextFunction } from "express";
import boom from "@hapi/boom";

/**
 * It will validate if the data is correct
 * depend of the schema
 * @param {Function} validator
 * @param {string} property
 * @returns {Function}
 */
function validatorHandler(schema: any, property: string) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const data = req.body[property];

    const { error } = schema.validate(data, { abortEarly: true });

    if (error) {
      next(boom.badRequest(error));
    } else {
      next();
    }
  };
}

export default validatorHandler;
