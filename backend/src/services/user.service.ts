/* eslint-disable class-methods-use-this */
/**
 * It contains all the class and he's methods
 * for manage all the table information
 * @module services/user
 */

import boom from "@hapi/boom";
import bcrypt from "bcrypt";
import { User } from "../db/entity/User";
import { AppDataSource } from "../data-source";
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
    const { password, ...userWithoutPassword } = user;
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
   * @param {string} email
   * @returns {IUser}
   */
  async findOne(email: string) {
    const user = await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .select(["user.password", "user.email", "user.id"])
      .where("user.email = :email", { email })
      .getOne();

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
  async update(email: string, user: Partial<IUser>) {
    const newUser = User.update({ email }, user);

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
