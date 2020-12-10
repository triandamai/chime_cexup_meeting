import BaseEntity from "./BaseEntity";

export interface IMeeting {
  id: number;
  meetingId: string;
  description: string;
  hostId: string;
  createdAt: string;
  updatedAt: string;
}

export class Meeting extends BaseEntity {
  meeting: IMeeting;
  constructor(data: IMeeting) {
    super();
    this.tableName = "meeting";
    this.meeting = data;
  }

  findQuery(): string {
    return ``;
  }

  insertQuery(): string {
    return (
      "INSERT " +
      "INTO" +
      this.tableName +
      " (meetingId,description,hostId,createdAt,updatedAt) " +
      "VALUES (" +
      "'" +
      this.meeting.id +
      "'," +
      "'" +
      this.meeting.meetingId +
      "'," +
      "'" +
      this.meeting.description +
      "'," +
      "'" +
      this.meeting.hostId +
      "'," +
      "'" +
      this.meeting.createdAt +
      "'," +
      "'" +
      this.meeting.updatedAt +
      "')"
    );
  }
  updateQuery(column: string, value: any): string {
    return `
            UPDATE 
                ${this.tableName} 
            SET 
                meetingId='${this.meeting.meetingId}',
                description='${this.meeting.description}',
                hostId='${this.meeting.hostId}',
                createdAt='${this.meeting.createdAt}',
                updatedAt='${this.meeting.updatedAt}'
            WHERE
                ${column}=${value}`;
  }
  deleteQuery(column: string, value: any): string {
    return `
            DELETE
            FROM
                ${this.tableName}
            WHERE ${column}=${value}
        `;
  }
}
