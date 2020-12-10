/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */

import * as express from "express";
import router from "./routes/routes";
import * as bodyparser from "body-parser";
import * as path from "path";

import user from "./controller/UserController";

class App {
  public express: express.Application;
  constructor() {
    this.express = express();
    this.express.use(bodyparser.json({ limit: "50mb" }));
    this.express.use(bodyparser.urlencoded({ extended: true, limit: "100mb" }));

    this.express.use(express.static(path.join(__dirname, "public")));
    //set engine
    this.express.set("views", path.join(__dirname, "views"));
    this.express.set("view engine", "ejs");

    this.loadRoutes();
  }

  private loadRoutes(): void {
    this.express.use("/", router);
    this.express.use("/", user);
  }
}

export default new App().express;
