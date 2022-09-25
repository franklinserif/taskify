/**
 * This module contains all controllers related to
 * workspace routes
 * @module controllers/workspace
 */

import { Request, Response, NextFunction } from "express";
import { IWorkspace } from "../index.type";
import WorkspaceService from "../services/Workspace.service";

const service = new WorkspaceService();

/**
 * get all workspace controller
 * @async
 * @param {Request} _req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function getWorkspaceController(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const workspace = await service.find();

    res.status(200).json(workspace);
  } catch (error) {
    next(error);
  }
}

/**
 * Workspace create controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function workspaceCreateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, ...data } = req.body;

    const user = await service.create(email as string, data as IWorkspace);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

/**
 * Workspace update controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function workspaceUpdateController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const data: Partial<IWorkspace> = req.body;

    const workspaceUpdated = await service.update(id, data);

    res.status(201).json(workspaceUpdated);
  } catch (error) {
    next(error);
  }
}

/**
 * Delete workspace controller
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export async function workspaceDeleteController(
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
