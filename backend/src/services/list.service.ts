/* eslint-disable class-methods-use-this */
/**
 * It contains all the class and he's methods
 * for manage all the table information
 * @module services/workspace
 */

import boom from "@hapi/boom";
import { IList } from "../index.type";
import { List } from "../db/entity/List";
import { User } from "db/entity/User";
import WorkspaceService from "./workspace.service";

const workspaceService = new WorkspaceService();

/**
 * This class will define all methods for manipule
 * data in the database table
 */
class ListService {
  /**
   * It will insert data in database table
   * @async
   * @param {string} workspaceId workspace Id
   * @param {IList} data
   * @returns {Promise<IList>}
   */
  async create(workspaceId: string, data: IList) {
    const workspace = await workspaceService.findOne(workspaceId);

    if (!workspace) throw boom.notFound();

    const newList = new List();

    newList.name = data.name;
    newList.color = data.color;

    newList.workspace = workspace;

    newList.save();

    return newList;
  }

  /**
   * Find all list by he's workspace
   * @async
   * @param {string} workspaceId
   * @returns {Promise<IList[]>}
   */
  async find(workspaceId: string) {
    const workspace = await workspaceService.findOne(workspaceId);

    return workspace.lists;
  }

  /**
   * Search List by he's id
   * @async
   * @param {string} id
   * @returns {Promise<IList>}
   */
  async findOne(id: string) {
    const list = await List.findOne({
      where: { id },
      relations: ["tasks"],
    });

    if (!list) throw boom.notFound();

    return list;
  }

  /**
   * Search list by owner email address
   * @async
   * @param {string} email owner email address
   * @return {Promise<IList>}
   */
  async findWorkspaceByUserEmail(email: string) {
    const user = await User.findOne({
      where: { email: email },
      relations: ["lists"],
    });

    return user?.lists;
  }

  /**
   * Update List information
   * @async
   * @param {string} id
   * @param {Partial<IList>} data
   * @returns {Promise<{delete: true}>}
   */
  async update(id: string, data: Partial<IList>) {
    const listUpdated = await List.update({ id }, data);

    if (!listUpdated) throw boom.notFound();

    return listUpdated;
  }

  /**
   * Delete an list
   * @async
   * @param {string} id
   * @return {Promise<IDeleteResponse>}
   */
  async delete(id: string) {
    const list = await List.findOneBy({ id });

    if (!list) throw boom.notFound();

    list.remove();

    return { delete: true };
  }
}

export default ListService;
