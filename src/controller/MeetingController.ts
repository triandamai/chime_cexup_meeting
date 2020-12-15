/**
 * Date     15 December 2020
 * Time     13:29
 * Author   Trian Damai
 * */
import {
  Post,
  Get,
  Aws,
  validateRequest,
  ValidationType,
  sendJSON200,
  sendJSON400
} from "../core";
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
              .then(result => {
                sendJSON200({ res: res, payload: res, message: result });
              })
              .catch(err => {
                sendJSON400({
                  res: res,
                  payload: null,
                  message: err
                });
              });
          } else {
            //failed attendee
            sendJSON400({
              res: res,
              payload: null,
              message: attende.$response.error
            });
          }
        } else {
          //failed create meeting
          sendJSON400({
            res: res,
            payload: null,
            message: meeting.$response.error
          });
        }
      } else {
        //cannot get id
        sendJSON400({ res: res, payload: null, message: "failed generate id" });
      }
    } else {
      //failed validate
      sendJSON400({ res: res, payload: null, message: validate.message });
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
