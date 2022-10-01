/**
 * List routing module
 * @module routes/list
 */
import validatorHandler from "../middlewares/validator.handler";
import {
  getListByIdSchema,
  createListSchema,
  updateListSchema,
} from "../schemas/list.schema";
import {
  getlistController,
  getlistByIdController,
  listUpdateController,
  listDeleteController,
  listCreateController,
} from "../controllers/list.controller";
import express from "express";
import passport from "passport";

/**
 * Express router to mount list related functions on
 * @type {Router}
 * @constant
 */
const router = express.Router();

/**
 * Serving get all list route
 * @openapi
 * /list:
 *    get:
 *      tags:
 *        - list
 *      summary: "get all list "
 *      description: get all list routes
 *      responses:
 *        '200':
 *          description: response with a lit of lists .
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getlistController
);

/**
 * Serving get list by id
 * @openapi
 * /list/:id:
 *    get:
 *      tags:
 *        - list
 *      summary: "get list by id "
 *      parameters:
 *        - in: path
 *          name: listId
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the list
 *      description: get list by id
 *      responses:
 *        '200':
 *          description: get list by id.
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getListByIdSchema, "params"),
  getlistByIdController
);

/**
 * Serving creation list endpoint
 * @openapi
 * /list:
 *    post:
 *      tags:
 *        - list
 *      summary: "create list"
 *      description: create a new list
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/createListSchema"
 *      responses:
 *        '200':
 *          description: response with the list information .
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createListSchema, "body"),
  listCreateController
);

/**
 * Serving list update information route
 * @openapi
 * /list/:id:
 *    patch:
 *      tags:
 *        - list
 *      summary: "list update information"
 *      description: list update information route
 *      parameters:
 *        - in: path
 *          name: listId
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the list to update
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/updateListSchema"
 *      responses:
 *        '201':
 *          description: response with list information .
 *        '401':
 *          description: user not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getListByIdSchema, "params"),
  validatorHandler(updateListSchema, "body"),
  listUpdateController
);

/**
 * Serving list delete route
 * @openapi
 * /list:
 *    delete:
 *      tags:
 *        - list
 *      summary: "list delete route"
 *      parameters:
 *        - in: path
 *          name: listId
 *          schema:
 *            type: string
 *          required: true
 *          description: id of the list to delete
 *      description: list delete all from db
 *      responses:
 *        '200':
 *          description: response with true .
 *        '401':
 *          description: list not found or unauthorized.
 *      security:
 *       - bearerAuth: []
 */
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getListByIdSchema, "params"),
  listDeleteController
);

export default router;
