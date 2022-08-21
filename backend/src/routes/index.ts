/**
 * This module contains the main setup
 * for all routes
 * @module routes/index
 */

/**
 * Main api router for serving all routes
 * @constant
 */
import express, { Express } from "express";

/**
 * Setup all routes and add o the main app
 * @param {Express} app
 * @returns {void}
 */
function routeApi(app: Express): void {
  const router = express.Router();

  app.use("/api/v1", router);
}

export default routeApi;
