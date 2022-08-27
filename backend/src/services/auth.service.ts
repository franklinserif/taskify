/**
 * It contains all the classes and it's methods
 * for manage all the table information related to the user
 * @module services/auth
 */

import boom from "@hapi/boom";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";
import UserService from "./user.service";

const service = new UserService();

/**
 * This class define all methos for manage
 * authentication
 */
class AuthService {
  /**
   * It will verify if the user exist and he's password
   * @async
   * @param {string} email
   * @param {string} password
   * @returns {Promise<Object>}
   */
  async getUser(email: string, password: string) {
    const user = await service.findByEmail(email);

    if (!user) throw boom.unauthorized();

    const isMath = bcrypt.compare(password, user.password);

    if (!isMath) throw boom.unauthorized();

    return user;
  }
}
