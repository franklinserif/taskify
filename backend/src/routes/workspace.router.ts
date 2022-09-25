/**
 * User routing module
 * @module routes/user
 */
import validatorHandler from "../middlewares/validator.handler";
import {
  getWorkspaceByIdSchema,
  createWorkspaceSchema,
  updateWorkspaceSchema,
} from "../schemas/workspace.schema";
import {
  getWorkspaceController,
  workspaceUpdateController,
  workspaceDeleteController,
  workspaceCreateController,
} from "../controllers/workspace.controller";
import express from "express";
import passport from "passport";

/**
 * Express router to mount workspace related functions on
 * @type {Router}
 * @constant
 */
const router = express.Router();

/**
 * Serving get all workspace route
 * @openapi
 * /workspace:
 *    get:
 *      tags:
 *        - workspace
 *      summary: "get all workspace "
 *      description: get all workspace routes
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/getUserByIdEmail"
 *      responses:
 *        '200':
 *          description: response with a lit of workspaces .
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getWorkspaceController
);
/**
 * Serving creation workspace endpoint
 * @openapi
 * /workspace:
 *    get:
 *      tags:
 *        - workspace
 *      summary: "create workspace "
 *      description: create a new workspace
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/getUserByIdEmail"
 *      responses:
 *        '200':
 *          description: response with the workspace information .
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createWorkspaceSchema, "body"),
  workspaceCreateController
);

/**
 * Serving workspace update information route
 * @openapi
 * /workspace:
 *    patch:
 *      tags:
 *        - workspace
 *      summary: "workspace update information"
 *      description: workspace update information route
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                allOf:
 *                  - $ref: "#/components/schemas/getUserByIdSchema"
 *                  - $ref: "#/components/schemas/updateUserSchema"
 *      responses:
 *        '201':
 *          description: response with workspace information .
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getWorkspaceByIdSchema, "params"),
  validatorHandler(updateWorkspaceSchema, "body"),
  workspaceUpdateController
);

/**
 * Serving workspace delete route
 * @openapi
 * /workspace:
 *    delete:
 *      tags:
 *        - workspace
 *      summary: "workspace delete route"
 *      description: workspace delete all from db
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/getUserByIdSchema"
 *      responses:
 *        '200':
 *          description: response with true .
 *        '401':
 *          description: workspace not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getWorkspaceByIdSchema, "params"),
  workspaceDeleteController
);

export default router;
