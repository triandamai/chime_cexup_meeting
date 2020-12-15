import { Post, Get, IModel } from "../core";
import { Request, Response } from "express";
import { MyModel } from "../model/MyModel";
export class MeetingController {
  /**
   * join
   * @param iduser
   * @param token
   * @param username
   * @returns joining Meeting with attende for joinning video conf
   * */
  @Post({ path: "/join", middlewares: [] })
  public join(req: Request, res: Response) {
    res.send("hai");
    let model = new MyModel() as IModel;
    model.get([""]);
  }
  /**
   * create
   * @param iduser
   * @param token
   * @param username
   * @returns crateing Meeting with attende for joinning video conf
   * */
  @Post({ path: "/create" })
  public hai(req: Request, res: Response) {
    res.send("hoi");
  }
}
