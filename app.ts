/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */

import * as express from "express";
import { appRouter } from "./src/core/decorator";
import * as bodyparser from "body-parser";
import "./src/controller";
import * as cors from "cors";
import { allowedOrigins } from "./src/origin";

class App {
  app: express.Application = express();
  constructor() {
    const corsOptions: cors.CorsOptions = {
      allowedHeaders: [
        "Origin",
        "X-Requested-With",
        "COntent-Type",
        "Accept",
        "X-Access-Token"
      ],
      credentials: false,
      methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
      origin: "http://localhost:8080"
    };
    this.app.use(cors(corsOptions));
    this.app.use(bodyparser.json({ limit: "50mb" }));
    this.app.use(bodyparser.urlencoded({ extended: true, limit: "50mb" }));
    this.app.use(appRouter);
  }
}

export default new App().app;
