import Model from "../lib/Model";

/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */
export interface History {
  id: number;
  meetingId: string;
  userId: string;
  joinAt: string;
  leaveAt: string;
}

export interface Meeting {
  id: number;
  meetingId: string;
  description: string;
  hostId: string;
  createdAt: string;
  updatedAt: string;
}
export class MeetingModel extends Model {
  tableName = "meeting";
}
