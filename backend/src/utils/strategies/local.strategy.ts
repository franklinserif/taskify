/**
 * This module contains the Local strategy auth
 * @module utils/strategies/local
 */
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import boom from "@hapi/boom";

import AuthService from "../../services/auth.service";

const service = new AuthService();

const localStrategy = new Strategy(
  {
    // @ts-ignore
    usernameField: "email",
    passwordField: "password",
  },

  /**
   * It will verify if the user exist
   * and if exist compare the password to
   * very if it's correct
   * @param {string} email
   * @param {string} password
   * @param {callback} done
   * @returns {Promise<any>}
   */
  async (email: string, password: string, done) => {
    try {
      const user = await service.getUser(email, password);
      console.log(`email: ${email}, password ${password}`);
      if (!user) done(boom.unauthorized(), false);

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

export default localStrategy;
