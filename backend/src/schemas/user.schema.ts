/**
 * This module will define the schema validation for users
 * @module schemas/user
 */

import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

const firstName = { type: "string" };
