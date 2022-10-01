/**
 * This module contains all controllers related to
 * task routes
 * @module controllers/task
 */

import { Request, Response, NextFunction } from "express";
import { ITask } from "../index.type";
import taskService from "../services/task.service";

const service = new taskService();

/**
 * get task by id controller
 * @async
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function gettaskController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const task = await service.findOne(id);

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

/**
 * get all task controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function gettaskByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // list id
    const { id } = req.params;

    const tasks = await service.find(id);

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
}

/**
 * task create controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function taskCreateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data = req.body;

    const task = await service.create(id as string, data as ITask);

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
}

/**
 * task update controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function taskUpdateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data: Partial<ITask> = req.body;

    const taskUpdated = await service.update(id, data);

    res.status(201).json(taskUpdated);
  } catch (error) {
    next(error);
  }
}

/**
 * Delete task controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function taskDeleteController(
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
