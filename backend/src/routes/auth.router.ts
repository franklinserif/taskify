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
  createConfirmCodeController,
  changePasswordController,
} from "../controllers/auth.controller";

import validatorHandler from "../middlewares/validator.handler";
import {
  createUserSchema,
  confirmCodeUserSchema,
  createCodeUserSchema,
  changeUserPasswordSchema,
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
 * Route serving confirm code
 * @name get/login
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware -
 * @param {callback} middleware - singupController
 */
router.post(
  "/code/confirm",
  validatorHandler(confirmCodeUserSchema, "body"),
  confirmCodeController
);

/**
 * Route serving createCode
 * @name post/createcode
 * @function
 * @param {string[]} path - Express path
 * @param {callback} middleware
 * @param {callback} middleware
 */
router.post(
  ["/code/new", "/password/forgot"],
  validatorHandler(createCodeUserSchema, "body"),
  createConfirmCodeController
);

/**
 * Route serving change password
 * @name post/createcode
 * @function
 * @param {string[]} path - Express path
 * @param {callback} middleware
 * @param {callback} middleware
 */
router.post(
  "/password/new",
  validatorHandler(changeUserPasswordSchema, "body"),
  changePasswordController
);

export default router;
