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
import {
  IUser,
  ISignTokeResponse,
  IConfirmCode,
  INewPasswordData,
} from "../index.type";
import sendEmail from "../utils/mail";

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

    const isMath = await bcrypt.compare(password, user!.password as string);

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

    if (user?.confirmCode === data.code && data.code !== 0) {
      !user.isActive && (user.isActive = true);
      user.confirmCode = 0;
      user?.save();
    } else {
      throw boom.unauthorized("invalid code");
    }

    return { complete: true, user };
  }

  /**
   * Generate random code
   * @async
   * @param {string} email
   * @returns {boolean}
   */
  async createCode(email: string): Promise<boolean> {
    const confirmCode = generateRandomCode();

    const user = await service.findByEmail(email);
    if (user) {
      user.confirmCode = confirmCode;
      user.save();

      await sendEmail({
        to: [email],
        subject: "confirmation code",
        html: `${confirmCode}`,
        text: `${confirmCode}`,
      });
    }
    return true;
  }

  /**
   * Change user password
   * @async
   * @param {INewPasswordData} data
   * @returns {boolean}
   */
  async changeUserPassword(data: INewPasswordData) {
    const { user } = await this.confirmCode(data);

    const newHashPassword = await bcrypt.hash(data.newPassword, 10);

    user.password = newHashPassword;
    user.save();

    return { complete: true, message: "password has been change" };
  }
}
export default AuthService;
