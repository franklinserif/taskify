/**
 * this module contains all controllers related
 * to authtentication
 * @module controllers/auth
 */

import { Request, Response, NextFunction } from "express";
import { IUser } from "../app.type";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

const authService = new AuthService();
const userService = new UserService();

/**
 * Login controller that handle
 * all login request
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function signinController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req;
    if (user) {
      res.json(await authService.signToken(user as IUser));
    }
  } catch (error) {
    next(error);
  }
}

/**
 * User register controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function signupController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data: IUser = req.body;

    const user = await userService.create(data);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}
