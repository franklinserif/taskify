/**
 * this module contains all controllers related
 * to authtentication
 * @module controllers/auth
 */

import { Request, Response, NextFunction } from "express";
import { IUser } from "../app.type";
import AuthService from "../services/auth.service";

const service = new AuthService();

/**
 * Login controller that handle
 * all login request
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req;
    if (user) {
      res.json(await service.signToken(user as IUser));
    }
  } catch (error) {
    next(error);
  }
}
