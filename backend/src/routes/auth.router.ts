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
import { loginController } from "../controllers/auth.controller";

/**
 * Express router to mount auth related function on
 * @type {Router}
 * @constant
 */
const router = express.Router();

/**
 * Route serving login
 * @name get/login
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - passport authentication method
 * @param {callback} middleware - loginController
 */
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  loginController
);

export default router;
