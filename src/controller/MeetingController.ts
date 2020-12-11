/**
 * Date     10 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */
import Controller from "../lib/Controller";
import { Request, Response } from "express";
import { MeetingModel } from "../entity/index";
import { Aws, asociatedAttende, asociatedMeeting } from "../lib/Aws";

class MeetingController extends Controller {
  constructor() {
    super();
  }
  join(req: Request, res: Response) {}
  create(req: Request, res: Response) {
    let model = new MeetingModel();
    let aws = new Aws();
    let hostId = req.body.idhost;
    let meeting = {};
    let attendee = {};
    model
      .cekId()
      .then(id => {
        aws
          .createMeeting({ hostId: hostId, asociatedId: id })
          .then(res => {
            meeting = res.Meeting;
            aws
              .attendeeMeeting({ meetingId: id, externalUserId: hostId })
              .then(res => {
                attendee = res.Attendee;
              })
              .catch(err => {});
          })
          .catch(err => {});
      })
      .catch(err => {});
  }
  registerRoutes() {
    this.router.post("/join", this.join);
    this.router.post("/create", this.create);
  }
}

export default new MeetingController().router;
