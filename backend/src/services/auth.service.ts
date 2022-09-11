/**
 * It contains all the classes and it's methods
 * for manage all the table information related to the user
 * @module services/auth
 */

import boom from "@hapi/boom";
import generateRandomCode from "../utils/random/generateRandomCode";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config";
import UserService from "./user.service";
import { IUser, ISignTokeResponse, IConfirmCode } from "../index.type";

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
   * @returns {Promise<IUser>}
   */
  async getUser(email: string, password: string) {
    const user = await service.findOne(email);

    if (!user) throw boom.unauthorized();

    const isMath = bcrypt.compare(password, user!.password as string);

    if (!isMath) throw boom.unauthorized();

    return user;
  }

  /**
   * @async
   * @param {IUser} user
   * @returns {ISignTokeResponse}
   */
  async signToken(user: IUser): Promise<ISignTokeResponse> {
    const payload = {
      sub: user.email,
      id: user.id,
    };

    const accessToken = jwt.sign(payload, config.accessTokenSecret as string, {
      expiresIn: config.accessTokenExpire,
    });

    const refreshToken = jwt.sign(
      payload,
      config.refreshTokenSecret as string,
      {
        expiresIn: config.refreshTokenExpire,
      }
    );

    await service.update(user.email, { refreshToken });

    return { accessToken, refreshToken };
  }

  /**
   * Confirm code
   * @async
   * @param {IConfirmCode} data
   */
  async confirmCode(data: IConfirmCode) {
    const user = await service.findByEmail(data.email);

    if (user?.confirmCode === data.confirmCode) {
      user.isActive = true;
      user.confirmCode = 0;
      user?.save();
    } else {
      throw boom.notFound();
    }

    return { complete: true };
  }

  /**
   * Generate random code
   * @async
   * @param {string} email
   */
  async createCode(email: string): Promise<boolean> {
    const confirmCode = generateRandomCode();

    const user = await service.findByEmail(email);

    if (user) {
      user.confirmCode = confirmCode;
      user.save();
    }
    return true;
  }
}
export default AuthService;
