/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */

import * as express from "express";
import { appRouter } from "./src/core/decorator";
import "./src/controller";

class App {
  app: express.Application = express();
  constructor() {
    this.app.use(appRouter);
  }
}

export default new App().app;
