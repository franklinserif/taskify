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
 * /user/profile/:id:
 *    get:
 *      tags:
 *        - user
 *      summary: "user/profile"
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the user
 *      description: user profile
 *      responses:
 *        '200':
 *          description: response with user profile information .
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/Profile/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getUserByIdSchema, "params"),
  getUserProfileController
);
/**
 * Serving user update information route
 * @openapi
 * /user:
 *    patch:
 *      tags:
 *        - user
 *      summary: "user update information"
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the user
 *      description: user profile
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/updateUserSchema"
 *      responses:
 *        '200':
 *          description: response with user profile information .
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getUserByIdSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  userUpdateController
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
 *      parameters:
 *        - in: path
 *          name: userId
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the user
 *      responses:
 *        '200':
 *          description: response with true .
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getUserByIdSchema, "params"),
  userDeleteController
);

export default router;
