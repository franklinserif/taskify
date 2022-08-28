/**
 * This module contains all controllers related to
 * user routes
 * @module controllers/user
 */

import { Request, Response, NextFunction } from "express";
import { IUser } from "../app.type";
import UserService from "@/services/user.service";

const service = new UserService();

/**
 * User register controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function userRegisterController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data: IUser = req.body;

    const user = await service.create(data);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

/**
 * User update controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function userUpdateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data: Partial<IUser> = req.body;

    const userUpdated = await service.update(id, data);

    res.status(201).json(userUpdated);
  } catch (error) {
    next(error);
  }
}

/**
 * Delete user controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function userDeleteController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const rta = await service.delete(id);

    res.status(201).json(rta);
  } catch (error) {
    next(error);
  }
}
