/* eslint-disable class-methods-use-this */
/**
 * It contains all the class and he's methods
 * for manage all the table information
 * @module services/task
 */

import boom from "@hapi/boom";
import { ITask } from "../index.type";
import { Task } from "../db/entity/Task";
import ListService from "./list.service";

const listService = new ListService();

/**
 * This class will define all methods for manipule
 * data in the database table
 */
class TaskService {
  /**
   * It will insert data in database table
   * @async
   * @param {string} ListId List's id
   * @param {ITask} data
   * @returns {Promise<ITask>}
   */
  async create(listId: string, data: ITask) {
    const list = await listService.findOne(listId);

    if (!list) throw boom.notFound();

    const newTask = new Task();

    newTask.name = data.name;
    newTask.description = data.description;

    newTask.list = list;

    newTask.save();

    return newTask;
  }

  /**
   * Find all list by he's workspace
   * @async
   * @param {string} listId
   * @returns {Promise<ITask[]>}
   */
  async find(listId: string) {
    const list = await listService.findOne(listId);

    return list.tasks;
  }

  /**
   * Search Task by he's id
   * @async
   * @param {string} id
   * @returns {Promise<IList>}
   */
  async findOne(id: string) {
    const task = await Task.findOne({
      where: { id },
    });

    if (!task) throw boom.notFound();

    return task;
  }

  /**
   * Update Task information
   * @async
   * @param {string} id
   * @param {Partial<ITask>} data
   * @returns {Promise<{delete: true}>}
   */
  async update(id: string, data: Partial<ITask>) {
    const taskUpdated = await Task.update({ id }, data);

    if (!taskUpdated) throw boom.notFound();

    return taskUpdated;
  }

  /**
   * Delete an list
   * @async
   * @param {string} id
   * @return {Promise<IDeleteResponse>}
   */
  async delete(id: string) {
    const task = await Task.findOneBy({ id });

    if (!task) throw boom.notFound();

    task.remove();

    return { delete: true };
  }
}

export default TaskService;
