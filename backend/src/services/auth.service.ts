/**
 * It contains all the class and he's methods
 * for manage all the table information
 * @module services/auth
 */

import boom from "@hapi/boom";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import config from "@/config";
import UserService from "@/services/user.services";

const service = new UserService();

/**
 * This class will define all methods for  manage
 * Authentication
 */
class AuthService {
  /**
   * It will verify if the user exist and if
   * the password is the same
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

    const { passsword, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  /**
   * It will sign a token
   * @param {Object} user
   * @returns {Object}
   */
  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  /**
   * It will send an email
   * @async
   * @param {string} email
   * @returns {Promise<Object>}
   */
  async sendMail(email: string) {
    const user = await service.findByEmail(email);

    if (!user) throw boom.unauthorized();

    const transporte = nodemailer.createTransport({
      host: config.emailHost,
      secure: true,
      port: 465,
      auth: {
        user: config.emailSender,
        pass: config.emailPassword,
      },
    });

    await transporte.sendMail({
      from: config.emailSender,
      to: `${user.email}`,
      subject: "Recovery password",
      text: "Hola",
      html: "<p>Hola</p>",
    });

    return { message: "mail send" };
  }
}
