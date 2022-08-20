/**
 * @file main file for the project
 */

import express from "express";
import passport from "passport";
import cors from "cors";
import config from "./config";

const app = express();

app.use(express.json());

/**
 * list of authorized domain - cors
 * @constant
 * @type {Array<string>}
 * @default
 */
const whiteList: Array<string> = ["http://localhost:8080"];

const options = {
  origin: whiteList,
};

/**
 * This object is for allow domain request
 * it will include all whiteList domain
 * @type {Object}
 */
app.use(cors(options));

app.use(passport.initialize());

app.get("/", (_req, res) => {
  res.send("<h1>Server is working</h1>");
});

app.listen(config.serverPort, () => {
  console.log(`server is running on port ${config.serverPort}`);
});
