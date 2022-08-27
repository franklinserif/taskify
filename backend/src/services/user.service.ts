/* eslint-disable class-methods-use-this */
/**
 * It contains all the class and he's methods
 * for manage all the table information
 * @module services/user
 */

import boom from "@hapi/boom";
import bcrypt from "bcrypt";
import { User } from "../db/entity/User";
import { IUser } from "../app.type";
/**
 * This class will define all methods for manipule
 * data in the database table
 */
class UserService {
  /**
   * It will insert data in database table
   * @async
   * @param {IUser} data
   * @returns {Promise<Pick<IUser, "email" | "firstName" | "lastName">>}
   */
  async create(data: IUser) {
    const user = new User();
    const hash = await bcrypt.hash(data.password, 10);

    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.email = data.email;
    user.password = hash;

    user.save();

    const { password, ...userWithoutPassword } = data;

    return userWithoutPassword;
  }

  /**
   * Find all user in the db
   * @async
   * @returns {Promise<IUser[]>}
   */
  async find() {
    const users = await User.find();

    return users;
  }

  /**
   * Search user by he's id
   * @async
   * @param {string} id
   * @returns {IUser}
   */
  async findOne(id: string) {
    const user = User.createQueryBuilder()
      .addSelect("user.password")
      .where("user.id = id", { id });

    if (!user) boom.notFound();

    return user;
  }

  /**
   * Search user by he's email address
   * @async
   * @param {string} email
   * @return {IUser}
   */
  async findByEmail(email: string) {
    const user = User.findOneBy({ email });

    if (!user) throw boom.notFound();

    return user;
  }

  /**
   * @async
   * @param {string} id
   * @param {Partial<IUser>} user
   * @returns {{delete: true}}
   */
  async update(id: string, user: Partial<IUser>) {
    const newUser = User.update({ id }, { ...user });

    if (!newUser) throw boom.notFound();

    return newUser;
  }

  /**
   * Delete an user
   * @async
   * @param {string} id
   * @return {Promise<IDeleteResponse>}
   */
  async delete(id: string) {
    const user = await User.findOneBy({ id });

    if (!user) throw boom.notFound();

    user.remove();

    return { delete: true };
  }
}

export default UserService;
