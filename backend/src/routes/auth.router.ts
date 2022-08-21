/**
 * This module contains all route for
 * Authentication
 * @module routes/auth
 * @requires express
 * @requires passport
 * @requires module:service/auth
 */

import express, { RequestHandler } from "express";
import passport from "passport";
import AuthService from "../services";

/**
 * Express router to mount auth related function on
 * @type {Router}
 * @constant
 */
const router = express.Router();

/**
 * Services related to Authentication functions
 * @constant
 */

const service = new AuthService();

/**
 * Route for login
 * @name post/login
 * @function
 * @param {string} path - express path
 * @param {RequestHandler} express middleware
 */
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  async (req, res, next) => {
    try {
      const { user } = req.body;
      res.json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

/**
 * Route for recovery password
 * @name post/recovery
 * @function
 * @param {string} path - express path
 * @param {RequestHandler} express middleware
 * @memberof module:routes/auth
 */

router.post("recovery", async (req, res, next) => {
  try {
    const { email } = req.body;
    const rta = service.sendEmail(email);
    res.json(rta);
  } catch (error) {
    next(error);
  }
});

export default router;
