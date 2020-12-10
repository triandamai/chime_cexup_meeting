/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */
import Controller from "../lib/Controller";
import { Request, Response } from "express";
import { MeetingModel } from "../entity/index";

class UserController extends Controller {
  constructor() {
    super();
  }

  public index(req: Request, res: Response) {
    let model = new MeetingModel();
    model
      .get(["id", "meetingid as m"])
      .where({ column: "id", value: 2 })
      .andwhere({ column: "description", value: "des" })
      .find()
      .then(val => {
        res.send(val);
      })
      .catch(err => {
        res.send(err);
      });
  }
  public add(req: Request, res: Response) {}
  public edit(req: Request, res: Response) {}

  public showUser(req: Request, res: Response) {
    res.render("index");
  }
  registerRoutes() {
    this.router.get("/api/users", this.index);
  }
}

export default new UserController().router;
