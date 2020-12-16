/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */

import * as express from "express";
import { appRouter } from "./src/core/decorator";
import * as bodyparser from "body-parser";
import "./src/controller";

class App {
  app: express.Application = express();
  constructor() {
    this.app.use(bodyparser.json({ limit: "50mb" }));
    this.app.use(bodyparser.urlencoded({ extended: true, limit: "50mb" }));
    this.app.use(appRouter);
  }
}

export default new App().app;
