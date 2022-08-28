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
function validatorHandler(validator: any, property: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body[property];

    if (validator(data)) {
      next();
    } else {
      next(validator.errors);
    }
  };
}

export default validatorHandler;
