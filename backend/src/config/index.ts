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
const {
  NODE_ENV,
  PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  ACCESS_TOKEN_EXPIRE,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRE,
} = process.env;

/**
 * It contains all enviroment variables
 * @constant
 */
export default {
  env: NODE_ENV,
  serverPort: PORT,
  accessTokenSecret: ACCESS_TOKEN_SECRET,
  accessTokenExpire: ACCESS_TOKEN_EXPIRE,
  refreshTokenSecret: REFRESH_TOKEN_SECRET,
  refreshTokenExpire: REFRESH_TOKEN_EXPIRE,
  dbName: DB_NAME,
  dbUser: DB_USER,
  dbPassword: DB_PASSWORD,
};
