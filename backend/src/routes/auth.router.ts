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
import {
  signinController,
  signupController,
  confirmCodeController,
} from "../controllers/auth.controller";

import validatorHandler from "../middlewares/validator.handler";
import {
  createUserSchema,
  confirmCodeUserSchema,
} from "../schemas/user.schema";
/**
 * Express router to mount auth related function on
 * @type {Router}
 * @constant
 */
const router = express.Router();

/**
 * Route serving signin
 * @name get/signin
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - passport authentication method
 * @param {callback} middleware - singinController
 */
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signinController
);

/**
 * Route serving signup
 * @name get/login
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware -
 * @param {callback} middleware - singupController
 */
router.post(
  "/signup",
  validatorHandler(createUserSchema, "body"),
  signupController
);

/**
 * Route serving signup
 * @name get/login
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware -
 * @param {callback} middleware - singupController
 */
router.post(
  "/confirm-code",
  validatorHandler(confirmCodeUserSchema, "body"),
  confirmCodeController
);

export default router;
