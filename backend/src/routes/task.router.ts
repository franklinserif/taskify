/**
 * Taskrouting module
 * @module routes/task
 */
import validatorHandler from "../middlewares/validator.handler";
import {
  gettaskByIdSchema,
  createtaskSchema,
  updatetaskSchema,
} from "../schemas/task.schema";
import {
  getTaskController,
  getTaskByIdController,
  taskUpdateController,
  taskDeleteController,
  taskCreateController,
} from "../controllers/task.controller";
import express from "express";
import passport from "passport";

/**
 * Express router to mount task related functions on
 * @type {Router}
 * @constant
 */
const router = express.Router();

/**
 * Serving get all task route
 * @openapi
 * /task:
 *    get:
 *      tags:
 *        - task
 *      summary: "get all task "
 *      description: get all task routes
 *      responses:
 *        '200':
 *          description: response with a lit of tasks.
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getTaskController
);

/**
 * Serving get task by id
 * @openapi
 * /task/:id:
 *    get:
 *      tags:
 *        - task
 *      summary: "get task by id "
 *      parameters:
 *        - in: path
 *          name: taskId
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the task
 *      description: get task by id
 *      responses:
 *        '200':
 *          description: get task by id.
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(gettaskByIdSchema, "params"),
  getTaskByIdController
);

/**
 * Serving creation task endpoint
 * @openapi
 * /task:
 *    post:
 *      tags:
 *        - task
 *      summary: "create task"
 *      description: create a new task
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/createTaskSchema"
 *      responses:
 *        '200':
 *          description: response with the task information .
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createtaskSchema, "body"),
  taskCreateController
);

/**
 * Serving task update information route
 * @openapi
 * /task/:id:
 *    patch:
 *      tags:
 *        - task
 *      summary: "task update information"
 *      description: task update information route
 *      parameters:
 *        - in: path
 *          name: taskId
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the task to update
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/updateTaskSchema"
 *      responses:
 *        '201':
 *          description: response with task information .
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(gettaskByIdSchema, "params"),
  validatorHandler(updatetaskSchema, "body"),
  taskUpdateController
);

/**
 * Serving task delete route
 * @openapi
 * /task:
 *    delete:
 *      tags:
 *        - task
 *      summary: "task delete route"
 *      parameters:
 *        - in: path
 *          name: taskId
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the task to delete
 *      description: task delete all from db
 *      responses:
 *        '200':
 *          description: response with true .
 *        '401':
 *          description: task not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(gettaskByIdSchema, "params"),
  taskDeleteController
);

export default router;
