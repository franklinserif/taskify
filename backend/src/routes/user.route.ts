/**
 * User routing module
 * @module routes/user
 */
import validatorHandler from "@/middlewares/validator.handler";
import { userRegisterSchema, userIdSchema } from "schemas/user.schema";
import {
  userRegisterController,
  userUpdateController,
  userDeleteController,
} from "controllers/user.controller";
import express from "express";
import passport from "passport";

const router = express.Router();

/**
 * Route for user register
 */
router.post(
  "/",
  passport.authenticate("local", { session: false }),
  validatorHandler(userRegisterSchema, "body"),
  userRegisterController
);

/**
 * Route for update user
 */
router.patch(
  "/",
  passport.authenticate("local", { session: false }),
  validatorHandler(userIdSchema, "params"),
  userUpdateController
);

/**
 * Route for delete user
 */
router.delete(
  "/",
  passport.authenticate("local", { session: false }),
  validatorHandler(userIdSchema, "params"),
  userDeleteController
);
