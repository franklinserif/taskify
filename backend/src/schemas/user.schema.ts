/**
 * This module will define the schema validation for users
 * @module schemas/user
 */

import Joi from "joi";

/**
 * user's id
 * @constant
 */
const id = Joi.string().uuid();

/**
 * @constant
 */
const firstName = Joi.string();

/**
 * @constant
 */
const lastName = Joi.string();

/**
 * @constant
 */

const password = Joi.string().pattern(
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
);

/**
 * @constant
 */
const email = Joi.string().email();

/**
 * @constant
 */
const isActive = Joi.boolean();

/**
 * Schema for validate user creation data
 * @constant
 * @type {Object}
 */
const createUserSchema = Joi.object({
  firstName: firstName.required(),
  lastName: lastName.required(),
  password: password.required(),
  email: email.required(),
});

/**
 * Schema for validate user update data
 * @constant
 * @type {Object}
 */
const updateUserSchema = Joi.object({
  firstName,
  lastName,
  email,
  isActive,
});

/**
 * Schema for validate get user by id
 * @constant
 * @type {Object}
 */
const getUserByIdSchema = Joi.object({
  id,
});

export { createUserSchema, updateUserSchema, getUserByIdSchema };
