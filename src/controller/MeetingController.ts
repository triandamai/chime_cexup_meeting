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
  sendJSON200,
  sendJSON400,
  ResultBuilder,
  uuid
} from "../core";
import { Request, Response } from "express";
import { MeetingModel } from "../model/MeetingModel";
import { HistoryModel } from "../model/HistoryModel";

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
    let model = new MeetingModel();
    let aws = new Aws();

    let validate = await validateRequest(req, [
      { field: "userId", type: "string", required: true },
      { field: "username", type: "string", required: true },
      {
        field: "description",
        type: "string",
        required: false
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
                id: uuid(),
                meetingId: meeting.Meeting.MeetingId,
                userId: req.body.userId,
                externalId: id,
                username: req.body.username,
                description: req.body.description,
                hostId: req.body.userId,
                createdAt: Date.now(),
                updatedAt: Date.now()
              })
              .run()
              .then(result => {
                sendJSON200({
                  res: res,
                  payload: {
                    meeting: "",
                    //meeting,
                    attendee: "", //attende
                    sql: result
                  },
                  message: result
                });
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
              message: "atendee failed " + attende.$response.error
            });
          }
        } else {
          //failed create meeting
          sendJSON400({
            res: res,
            payload: null,
            message: "failed meeting" + meeting.$response.error
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
  public async join(req: Request, res: Response) {
    let meetingmodel = new MeetingModel();
    let historymodel = new HistoryModel();
    let aws = new Aws();
    let validate = await validateRequest(req, [
      { field: "userId", type: "string", required: true }
    ]);
    if (validate.next) {
      meetingmodel
        .get(["meetingId", "hostId"])
        .where({ column: "meetingId", value: req.body.meetingId })
        .run()
        .then(async result => {
          let meeting = await aws.joinMeeting({ asociatedId: "", hostId: "" });
          if (meeting) {
            let attende = await aws.attendeeMeeting({
              meetingId: meeting.Meeting.MeetingId,
              externalUserId: ""
            });
            if (attende) {
              //success
              historymodel
                .insert({ meetingId: meeting.Meeting.MeetingId })
                .run()
                .then(results => {})
                .catch(error => {});
            } else {
              //failed attende
            }
          } else {
            //failed get meeting
          }
        })
        .catch(error => {});
    } else {
      sendJSON400({ res: res, payload: null, message: validate.message });
    }
  }
}
