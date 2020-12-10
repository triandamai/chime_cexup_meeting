import * as express from "express";
import router from "./routes/routes";
import * as bodyparser from "body-parser";
import * as path from "path";

import user from "./controller/UserController";
import auth from "./controller/AuthController";
import main from "./controller/VideoController";
import notif from "./controller/Notification";
import conv from "./controller/Converter";

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
    this.express.use("/", auth);
    this.express.use("/", main);
    this.express.use("/", notif);
    this.express.use("/", conv);
  }
}

export default new App().express;
