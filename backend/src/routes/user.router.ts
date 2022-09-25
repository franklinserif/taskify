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
 * Serving user profile route
 * @openapi
 * /user/profile:
 *    get:
 *      tags:
 *        - user
 *      summary: "user/profile"
 *      description: user profile
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/getUserByIdEmail"
 *      responses:
 *        '200':
 *          description: response with user profile information .
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/Profile",
  passport.authenticate("local", { session: false }),
  getUsersController
);
/**
 * Serving user update information route
 * @openapi
 * /user:
 *    patch:
 *      tags:
 *        - user
 *      summary: "user update information"
 *      description: user profile
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                allOf:
 *                  - $ref: "#/components/schemas/getUserByIdSchema"
 *                  - $ref: "#/components/schemas/updateUserSchema"
 *      responses:
 *        '200':
 *          description: response with user profile information .
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.patch(
  "/",
  passport.authenticate("local", { session: false }),
  validatorHandler(getUserByIdSchema, "params"),
  getUserProfileController
);

/**
 * Serving user delete route
 * @openapi
 * /user:
 *    delete:
 *      tags:
 *        - user
 *      summary: "user/profile"
 *      description: user delete
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/getUserByIdSchema"
 *      responses:
 *        '200':
 *          description: response with true .
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/",
  passport.authenticate("local", { session: false }),
  validatorHandler(getUserByIdSchema, "params"),
  userDeleteController
);

export default router;
