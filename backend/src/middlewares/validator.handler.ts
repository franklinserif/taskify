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
 * @param {Object} validator
 * @param {string} property
 * @returns {Function}
 */
function validatorHandler(validator, property) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req.body[property];

    const { errors } = validator(data);

    if (errors) {
      next(boom.badRequest(errors));
    } else {
      next();
    }
  };
}

export default validatorHandler;
