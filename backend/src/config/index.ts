/**
 * It will read all .env variable and make
 * available for the entire project
 * @module  config/index
 * @requires dotenv
 */

import dotenv from "dotenv";

dotenv.config();

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
};
