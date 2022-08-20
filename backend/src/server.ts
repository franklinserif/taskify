/**
 * @file main file for the project
 */

import express from "express";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import { TCorsOriginCallback } from "@/AppTypes";

const app = express();

app.use(express.json());

const whiteList = ["http://localhost:8080"];

const options = {
  origin: (origin: string, callback: TCorsOriginCallback) => {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("No authorized"));
    }
  },
};

app.use(cors(options));

app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
