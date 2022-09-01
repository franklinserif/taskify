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
import userRoutes from "./user.router";
import authRoutes from "./auth.router";

/**
 * Setup all routes and add o the main app
 * @param {Express} app
 * @returns {void}
 */
function routeApi(app: Express): void {
  const router = express.Router();
  console.log("working");
  router.use("/user", userRoutes);
  router.use("/auth", authRoutes);

  app.use("/api/v1", router);
}

export default routeApi;
