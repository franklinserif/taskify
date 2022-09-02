/**
 * This module contains all controllers related to
 * user routes
 * @module controllers/user
 */

import { Request, Response, NextFunction } from "express";
import { IUser } from "../app.type";
import UserService from "../services/user.service";

const service = new UserService();

/**
 * get all users controller
 * @async
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getUsersController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await service.find();

    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
}

/**
 * get user profile controller
 * @async
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getUserProfileController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const user = await service.findOne(id);

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
