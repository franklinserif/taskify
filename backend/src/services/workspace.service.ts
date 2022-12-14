/* eslint-disable class-methods-use-this */
/**
 * It contains all the class and he's methods
 * for manage all the table information
 * @module services/workspace
 */

import boom from "@hapi/boom";
import { Workspace } from "../db/entity/Workpace";
import { IWorkspace } from "../index.type";
import UserService from "./user.service";
import { User } from "../db/entity/User";
const service = new UserService();

/**
 * This class will define all methods for manipule
 * data in the database table
 */
class WorkspaceService {
  /**
   * It will insert data in database table
   * @async
   * @param {string} userEmail user's email address
   * @param {IWorkspace} data
   * @returns {Promise<IWorkspace>}
   */
  async create(userEmail: string, data: IWorkspace) {
    const owner = await service.findByEmail(userEmail);

    const newWorkspace = new Workspace();
    if (!owner) throw boom.notFound();

    newWorkspace.name = data.name;
    newWorkspace.description = data.description;

    owner.workspaces.push(newWorkspace);
    owner.save();
    newWorkspace.save();

    return newWorkspace;
  }

  /**
   * Find all workspaces in the db
   * @async
   * @returns {Promise<IWorkspace[]>}
   */
  async find() {
    const workspaces = await Workspace.find();

    return workspaces;
  }

  /**
   * Search workspace by he's id
   * @async
   * @param {string} id
   * @returns {IWorkspace}
   */
  async findOne(id: string) {
    const workspace = await Workspace.findOne({
      where: { id },
      relations: ["lists"],
    });

    if (!workspace) throw boom.notFound();

    return workspace;
  }

  /**
   * Search workspace by owner email address
   * @async
   * @param {string} email owner email address
   * @return {IWorkpaces}
   */
  async findWorkspaceByUserEmail(email: string) {
    const user = await User.findOne({
      where: { email: email },
      relations: ["workspaces"],
    });
    const allUserWorkspaces = user?.workspaces;
    return allUserWorkspaces;
  }

  /**
   * Update workspace information
   * @async
   * @param {string} id
   * @param {Partial<IWorkspace>} workspace
   * @returns {{delete: true}}
   */
  async update(id: string, workspace: Partial<IWorkspace>) {
    const workspaceUpdated = await Workspace.update({ id }, workspace);

    if (!workspaceUpdated) throw boom.notFound();

    return workspaceUpdated;
  }

  /**
   * Delete an workspace
   * @async
   * @param {string} id
   * @return {Promise<IDeleteResponse>}
   */
  async delete(id: string) {
    const workspace = await Workspace.findOneBy({ id });

    if (!workspace) throw boom.notFound();

    workspace.remove();

    return { delete: true };
  }
}

export default WorkspaceService;
