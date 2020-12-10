/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */

import { Router, Request, Response } from "express";
export interface Res {
  status: string;
  statusCode: number;
  body: any;
  message: string;
  contentType: string;
}
abstract class Controller {
  public router: Router;
  constructor() {
    this.router = Router();
    this.registerRoutes();
  }
  abstract registerRoutes(): void;
  public response(data: Res, res: Response) {
    if (data.statusCode == 200 || data.statusCode == 201) {
      return res.status(data.statusCode).send(data).end();
    } else {
      return res.status(data.statusCode).send(data).end();
    }
  }
}

export default Controller;
