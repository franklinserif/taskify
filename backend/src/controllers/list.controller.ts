/**
 * This module contains all controllers related to
 * list routes
 * @module controllers/list
 */

import { Request, Response, NextFunction } from "express";
import { IList } from "../index.type";
import listService from "../services/list.service";

const service = new listService();

/**
 * get list by id controller
 * @async
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getlistController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const list = await service.findOne(id);

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
}

/**
 * get all list controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getlistByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // workspace id
    const { id } = req.params;

    const lists = await service.find(id);

    res.status(200).json(lists);
  } catch (error) {
    next(error);
  }
}

/**
 * list create controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function listCreateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data = req.body;

    const list = await service.create(id as string, data as IList);

    res.status(200).json(list);
  } catch (error) {
    next(error);
  }
}

/**
 * list update controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function listUpdateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data: Partial<IList> = req.body;

    const listUpdated = await service.update(id, data);

    res.status(201).json(listUpdated);
  } catch (error) {
    next(error);
  }
}

/**
 * Delete list controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function listDeleteController(
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
