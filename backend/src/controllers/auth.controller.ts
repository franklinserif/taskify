/**
 * this module contains all controllers related
 * to authtentication
 * @module controllers/auth
 */

import { Request, Response, NextFunction } from "express";
import { IUser, IConfirmCode, INewPasswordData } from "../index.type";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

const authService = new AuthService();
const userService = new UserService();

/**
 * Signin controller that handle
 * all signin request
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

/**
 * User confirm code controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function confirmCodeController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data: IConfirmCode = req.body;

    const rta = await authService.confirmCode(data);

    res.status(200).json({ complete: rta.complete });
  } catch (error) {
    next(error);
  }
}

/**
 * User create confirmation code controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function createConfirmCodeController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.body;

    const rta = await authService.createCode(email);

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}

/**
 * User change password controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function changePasswordController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data: INewPasswordData = req.body;
    const rta = await authService.changeUserPassword(data);

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}
