/**
 * Date     15 December 2020
 * Time     13:29
 * Author   Trian Damai
 * */
import { Post, Get } from "../core";
import { Request, Response } from "express";
import { MyModel } from "../model/MyModel";
import { Aws, validateRequest, ValidationType } from "../core";

export class MeetingController {
  /**
   * join
   * @param iduser
   * @param token
   * @param username
   * @returns joining Meeting with attende for joinning video conf
   * */
  @Post({ path: "/create", middlewares: [] })
  public async create(req: Request, res: Response) {
    let model = new MyModel();
    let aws = new Aws();
    let validate = validateRequest(req, [
      { field: "userId", type: ValidationType.string, required: true },
      {
        field: "description",
        type: ValidationType.string,
        required: true
      }
    ]);
    if (validate.next) {
      let id = await model.availableId();
      if (id) {
        let meeting = await aws.createMeeting({
          asociatedId: id,
          hostId: req.body.userId
        });
        if (meeting) {
          let attende = await aws.attendeeMeeting({
            externalUserId: req.body.userId,
            meetingId: meeting.Meeting.MeetingId
          });
          if (attende) {
            model
              .insert({
                meetingId: meeting.Meeting.MeetingId,
                userId: req.body.userId,
                description: req.body.description,
                hostId: req.body.userId,
                createAt: Date.now(),
                updateAt: Date.now()
              })
              .write()
              .then(res => {})
              .catch(err => {});
          } else {
          }
        } else {
        }
      } else {
      }
    }
  }
  /**
   * create
   * @param iduser
   * @param token
   * @param username
   * @returns crateing Meeting with attende for joinning video conf
   * */
  @Post({ path: "/join" })
  public join(req: Request, res: Response) {
    res.send("hoi");
  }
}
