/**
 * This module contains all middleware
 * that validate data
 * @module middleware/validator
 * @requires boom
 */
import { Response, NextFunction } from "express";
import boom from "@hapi/boom";

/**
 * It will validate if the data is correct
 * depend of the schema
 * @param {Function} validator
 * @param {string} property
 * @returns {Function}
 */
function validatorHandler(schema: any, property: string) {
  return (req: any, _res: Response, next: NextFunction) => {
    const data = req[property];

    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      next(boom.badRequest(error));
    } else {
      next();
    }
  };
}

export default validatorHandler;
