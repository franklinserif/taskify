/**
 * main file for the entire project
 * @author franklin rodriguez
 */

import express from "express";
import cors from "cors";
import passport from "passport";
import config from "./config";
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./docs/swagger";

import routeApi from "./routes";
import { boomErrorHandler, ormErrorHandler } from "./middlewares/error.handler";
import { AppDataSource } from "./data-source";
import "./utils/auth/index";

const app = express();

/**
 * list of authorized domain - cors
 * @constant
 * @type {Array<string>}
 * @default
 */
const whiteList = ["http://localhost:8080"];

/**
 * This object is for allow domain request
 * it will include all whiteList domain
 * @type {Object}
 */
const options = {
  origin: whiteList,
};

app.use(cors(options));

app.use(express.json());

app.use(passport.initialize());

routeApi(app);

app.use(ormErrorHandler);

app.use(boomErrorHandler);

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSetup));

app.listen(config.serverPort, () => {
  // database initialize
  AppDataSource.initialize()
    .then(() => {
      if (config.env === "development") {
        console.log("database initialize...");
        console.log(
          `server running at http://localhost port ${config.serverPort}`
        );
      }
    })
    .catch((error) => console.log(error));
});
