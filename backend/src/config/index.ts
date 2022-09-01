/**
 * It cointains all enviroment variables and serve
 * for the entire app
 * @module config
 */

import dotenv from "dotenv";

/**
 * It load all enviroment variables in env.procces
 */
dotenv.config();

/**
 * variables inside .env file loaded
 */
const { NODE_ENV, PORT, JWT_SECRET, DB_NAME, DB_USER, DB_PASSWORD } =
  process.env;

/**
 * It contains all enviroment variables
 * @constant
 */
export default {
  env: NODE_ENV,
  serverPort: PORT,
  secretOrKey: JWT_SECRET,
  dbName: DB_NAME,
  dbUser: DB_USER,
  dbPassword: DB_PASSWORD,
};
