/**
 * This module contains all route for
 * Authentication
 * @module routes/auth
 * @requires express
 * @requires passport
 * @requires module:service/auth
 */

import express from "express";
import passport from "passport";
import { validatorHandler } from "../middlewares/validatorHandler";
import { loginController } from "controllers/auth.controller";

/**
 * Express router to mount auth related function on
 * @type {Router}
 * @constant
 */
const router = express.Router();

/**
 * Route for login
 */
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  loginController
);

export default router;
