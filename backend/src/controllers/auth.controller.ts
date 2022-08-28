/**
 * this module contains all controllers related
 * to authtentication
 * @module controllers/auth
 */

import { Request, Response, NextFunction } from "express";
import AuthService from "@/services/auth.service";
import { IUser } from "../app.type";

const service = new AuthService();

/**
 * Login controller that handle
 * all login request
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { user } = req;

    res.json(service.signToken(user as IUser));
  } catch (error) {
    next(error);
  }
}
