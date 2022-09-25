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
  getWorkspaceByIdController,
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
 * Serving get workspace by id
 * @openapi
 * /workspace/:id:
 *    get:
 *      tags:
 *        - workspace
 *      summary: "get workspace by id "
 *      parameters:
 *        - in: path
 *          name: workspaceId
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the workspace
 *      description: get workspace by id
 *      responses:
 *        '200':
 *          description: get workspace by id.
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getWorkspaceByIdSchema, "params"),
  getWorkspaceByIdController
);

/**
 * Serving creation workspace endpoint
 * @openapi
 * /workspace:
 *    post:
 *      tags:
 *        - workspace
 *      summary: "create workspace"
 *      description: create a new workspace
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/createWorkspaceSchema"
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
 * /workspace/:id:
 *    patch:
 *      tags:
 *        - workspace
 *      summary: "workspace update information"
 *      description: workspace update information route
 *      parameters:
 *        - in: path
 *          name: workspaceId
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the workspace to update
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                  - $ref: "#/components/schemas/updateWorkspaceSchema"
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
 *      parameters:
 *        - in: path
 *          name: workspaceId
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the workspace to delete
 *      description: workspace delete all from db
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
