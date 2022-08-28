/**
 * This module will define the schema validation for users
 * @module schemas/user
 */

import Ajv from "ajv";
import { IUserLoginSchema } from "../app.type";

const ajv = new Ajv({ allErrors: true });

const id = { type: "string" };
const firstName = { type: "string" };
const lastName = { type: "string" };
const email = { type: "string", format: "email" };
const password = { type: "string" };

/**
 * DTO for login data validation
 * @constant
 */
const userLoginSchema = ajv.compile<IUserLoginSchema>({
  type: "userLoginSchema",
  properties: {
    email,
    password,
  },
  required: ["email", "password"],
});

/**
 * DTO for user register
 * @constant
 */
const userRegisterSchema = ajv.compile({
  type: "userRegisterSchema",
  properties: {
    firstName,
    lastName,
    email,
    password,
    required: ["firstName", "lastName", "email", "password"],
  },
});

const userIdSchema = ajv.compile({
  type: "userIdSchema",
  properties: {
    id,
  },
  required: ["id"],
});

export { userLoginSchema, userRegisterSchema, userIdSchema };
