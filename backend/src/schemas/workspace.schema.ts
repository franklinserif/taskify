/**
 * This module will define the schema validation for users
 * @module schemas/user
 */

import Joi from "joi";

/**
 * Workspace's id
 * @constant
 */
const id = Joi.string();

/**
 * Workspace's name
 * @constant
 */
const name = Joi.string();

/**
 * Workspace's description
 */
const description = Joi.string();

/**
 * Schema for validate data for workspace
 * creation
 */
const createWorkspaceSchema = Joi.object({
  name: name.required(),
  description: description.required(),
});

/**
 * Schema for update workspace
 */
const updateWorkspaceSchema = Joi.object({
  name,
  description,
});

/**
 * Schema for find workpace by id
 */
const getWorkspaceByIdSchema = Joi.object({
  id: id.required(),
});

export { createWorkspaceSchema, updateWorkspaceSchema, getWorkspaceByIdSchema };
