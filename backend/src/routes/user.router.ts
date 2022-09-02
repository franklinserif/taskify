/**
 * User routing module
 * @module routes/user
 */
import validatorHandler from "../middlewares/validator.handler";
import { getUserByIdSchema, updateUserSchema } from "../schemas/user.schema";
import {
  getUsersController,
  getUserProfileController,
  userUpdateController,
  userDeleteController,
} from "../controllers/user.controller";
import express from "express";
import passport from "passport";

/**
 * Express router to mount uder related functions on
 * @type {Router}
 * @constant
 */
const router = express.Router();

/**
 * Route serving users endpoint
 * @name patch/user
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - passport Authentication
 * @param {callback} middleware - getUsersController
 */
router.patch(
  "/",
  passport.authenticate("local", { session: false }),
  getUsersController
);

/**
 * Route serving user profile endpoint
 * @name patch/user
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - passport Authentication
 * @param {callback} middleware - validatorHandler id
 * @param {callback} middleware - getuserProfileController
 */
router.patch(
  "/",
  passport.authenticate("local", { session: false }),
  validatorHandler(getUserByIdSchema, "params"),
  getUserProfileController
);

/**
 * Route serving user update endpoint
 * @name patch/user
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - passport Authentication
 * @param {callback} middleware - validatorHandler id
 * @param {callback} middleware - validatorHandler update
 * @param {callback} middleware - userUpdateController
 */
router.patch(
  "/",
  passport.authenticate("local", { session: false }),
  validatorHandler(getUserByIdSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  userUpdateController
);

/**
 * Route serving user delete endpoint
 * @name delete/user
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - passport Authentication
 * @param {callback} middleware - validatiorHandler id
 * @param {callback} middleware - userDeleteController
 */
router.delete(
  "/",
  passport.authenticate("local", { session: false }),
  validatorHandler(getUserByIdSchema, "params"),
  userDeleteController
);

export default router;
