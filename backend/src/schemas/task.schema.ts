/**
 * This module will define the schema validation for task
 * @module schemas/task
 */

import Joi from "joi";

/**
 * task's id
 * @constant
 */
const id = Joi.string();

/**
 * task's name
 * @constant
 */
const name = Joi.string();

/**
 * task description
 * @constant
 */
const description = Joi.string();

/**
 * Schema for validate data for task
 * creation
 */
const createtaskSchema = Joi.object({
  name: name.required(),
  description: description.required(),
});

/**
 * Schema for update task
 */
const updatetaskSchema = Joi.object({
  name,
  description,
});

/**
 * Schema for find task by id
 */
const gettaskByIdSchema = Joi.object({
  id: id.required(),
});

export { createtaskSchema, updatetaskSchema, gettaskByIdSchema };
