/**
 * Date     15 December 2020
 * Time     13:29
 * Author   Trian Damai
 * */
import {
  Post,
  Aws,
  validateRequest,
  sendJSON200,
  sendJSON404,
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
    //init class
    const model = new MeetingModel();
    const aws = new Aws();

    //validate request
    const { next, message } = await validateRequest(req, [
      { field: "userId", type: "string", required: true },
      { field: "username", type: "string", required: true },
      {
        field: "description",
        type: "string",
        required: false
      }
    ]);
    //validation passed
    if (next) {
      //create id
      const availableId = await model.availableId();
      //create meeting
      const createMeeting = await aws.createMeeting({
        asociatedId: availableId,
        hostId: req.body.userId
      });
      //fail create meeting
      if (!createMeeting.Meeting)
        return sendJSON404({
          res: res,
          payload: null,
          message: "Meeting failed" + createMeeting.$response.error
        });
      //create attendee
      const attendeeMeeting = await aws.attendeeMeeting({
        externalUserId: req.body.userId,
        meetingId: createMeeting.Meeting.MeetingId
      });
      //fail attend
      if (!attendeeMeeting.Attendee)
        return sendJSON404({
          res: res,
          payload: null,
          message: "Meeting failed" + attendeeMeeting.$response.error
        });
      //insert meeting and attend
      const { success, data, message } = await model
        .insert({
          id: uuid(),
          meetingId: createMeeting.Meeting.MeetingId,
          userId: req.body.userId,
          externalId: availableId,
          username: req.body.username,
          description: req.body.description,
          hostId: req.body.userId,
          createdAt: Date.now(),
          updatedAt: Date.now()
        })
        .run();

      //success
      if (success) {
        return sendJSON200({
          res: res,
          payload: {
            meeting: createMeeting,
            attendee: attendeeMeeting,
            user: {
              meetingId: createMeeting.Meeting.MeetingId,
              userId: req.body.userId,
              externalId: availableId,
              username: req.body.username,
              description: req.body.description,
              hostId: req.body.userId,
              createdAt: Date.now(),
              updatedAt: Date.now()
            },
            sql: data
          },
          message: message
        });
        //fail
      } else {
        return sendJSON404({
          res: res,
          payload: null,
          message: "failed insert" + message
        });
      }
    } else {
      //validation of request didn't match
      return sendJSON404({
        res: res,
        payload: null,
        message: message
      });
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
    //init class
    const meetingmodel = new MeetingModel();
    const historymodel = new HistoryModel();
    const aws = new Aws();
    //validation request body
    const { message, next } = await validateRequest(req, [
      { field: "userId", type: "string", required: true },
      { field: "meetingId", type: "string", required: true },
      { field: "username", type: "string", required: true }
    ]);
    //validation passed
    if (next) {
      //getdata meeting
      const { success, data } = await meetingmodel
        .getAll()
        .where({ column: "externalId", value: req.body.meetingId })
        .run();
      //meeting doesnot exist
      if (!success)
        return sendJSON404({
          res: res,
          payload: null,
          message: "Not found"
        });
      if (!data[0])
        return sendJSON404({
          res: res,
          payload: null,
          message: "Not found"
        });
      const idmeeting = data[0].meetingId;
      const id = data[0].id;
      const host = data[0].hostId;

      aws
        .joinMeeting({
          asociatedId: idmeeting,
          hostId: host
        })
        .then(({ Meeting }) => {
          aws
            .attendeeMeeting({
              externalUserId: req.body.userId,
              meetingId: Meeting.MeetingId
            })
            .then(async ({ Attendee }) => {
              const inserthistory = await historymodel
                .insert({
                  meetingId: id,
                  userId: req.body.userId,
                  username: req.body.username,
                  joinAt: Date.now()
                })
                .run();
              if (!inserthistory.success)
                return sendJSON404({
                  res: res,
                  payload: null,
                  message: inserthistory.message
                });
              return sendJSON200({
                res: res,
                payload: {
                  meeting: Meeting,
                  attende: Attendee,
                  user: {
                    meetingId: Meeting.MeetingId,
                    userId: req.body.userId,
                    externalId: req.body.meetingId,
                    username: req.body.username,
                    description: req.body.description,
                    hostId: req.body.userId,
                    createdAt: Date.now(),
                    updatedAt: Date.now()
                  }
                },
                message: "Success"
              });
            })
            .catch(err => {
              return sendJSON404({
                res: res,
                payload: null,
                message: "failed atendee" + err
              });
            });
        })
        .catch(err => {
          return sendJSON404({
            res: res,
            payload: null,
            message: "failed join meeting is not foun or finish "
          });
        });
    } else {
      sendJSON404({ res: res, payload: null, message: message });
    }
  }

  @Post({ path: "/end", middlewares: [] })
  public end(req: Request, res: Response) {}
}
