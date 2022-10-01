/**
 * This module will define the schema validation for List
 * @module schemas/list
 */

import Joi from "joi";

/**
 * List's id
 * @constant
 */
const id = Joi.string();

/**
 * List's name
 * @constant
 */
const name = Joi.string();

/**
 * List color
 * @constant
 */
const color = Joi.string();

/**
 * Schema for validate data for list
 * creation
 */
const createListSchema = Joi.object({
  name: name.required(),
  color: color.required(),
});

/**
 * Schema for update list
 */
const updateListSchema = Joi.object({
  name,
  color,
});

/**
 * Schema for find list by id
 */
const getListByIdSchema = Joi.object({
  id: id.required(),
});

export { createListSchema, updateListSchema, getListByIdSchema };
