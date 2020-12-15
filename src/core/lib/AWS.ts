/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */

import { Chime, config, Endpoint } from "aws-sdk";
require("dotenv").config();

interface asociatedMeeting {
  asociatedId: any;
  hostId: string;
}

interface asociatedAttende {
  meetingId: any;
  externalUserId: string;
}
class Aws {
  private chime: Chime;
  constructor() {
    config.update({
      accessKeyId: process.env.ACCES_KEY,
      secretAccessKey: process.env.SECRET_KEY,
      region: process.env.REGION
    });
    this.chime = new Chime({ region: process.env.REGION });
    this.chime.endpoint = new Endpoint("https://service.chime.aws.amazon.com");
  }
  /**
   * createingmeeting by host
   * @param asociatedMeeting
   * @returns meeting for attende
   * */
  async createMeeting(data: asociatedMeeting) {
    return await this.chime
      .createMeeting({
        ClientRequestToken: data.asociatedId,
        MediaRegion: process.env.REGION,
        ExternalMeetingId: data.asociatedId
      })
      .promise();
  }
  /**
   * join to existing meeting
   * @param asociatedMeeting
   * @returns meeting for attende
   * */
  async joinMeeting(data: asociatedMeeting) {
    return await this.chime
      .getMeeting({ MeetingId: data.asociatedId })
      .promise();
  }
  /**
   * attendee to meeting after create or join meeting
   * @param asociatedAttende
   * @returns meeting data and attendee
   * */
  async attendeeMeeting(data: asociatedAttende) {
    return await this.chime
      .createAttendee({
        MeetingId: data.meetingId,
        ExternalUserId: data.externalUserId
      })
      .promise();
  }
  /**
   * delete meeting by host
   * @param asocietedMeeting
   * @returns deleting room meeting for all
   * */
  async deleteMeeting(data: asociatedMeeting) {
    return await this.chime
      .deleteMeeting({ MeetingId: data.asociatedId })
      .promise();
  }
}
export { Aws, asociatedAttende, asociatedMeeting };
