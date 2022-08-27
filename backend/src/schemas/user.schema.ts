/**
 * This module will define the schema validation for users
 * @module schemas/user
 */

const firstName = { type: "string" };
const lastName = { type: "string" };
const email = { type: "string", format: "email" };
const password = { type: "string" };

/**
 * DTO for login data validation
 * @constant
 */
const userLoginSchema = {
  type: "userLoginSchema",
  properties: {
    email,
    password,
  },
  required: ["email", "password"],
};

/**
 * DTO for user register
 * @constant
 */
const userRegisterSchema = {
  type: "userRegisterSchema",
  properties: {
    firstName,
    lastName,
    email,
    password,
    required: ["firstName", "lastName", "email", "password"],
  },
};

export { userLoginSchema, userRegisterSchema };
