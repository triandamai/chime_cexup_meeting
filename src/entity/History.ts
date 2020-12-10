import BaseEntity from "./BaseEntity";
export interface IHistory {
  id: number;
  meetingId: string;
  userId: string;
  joinAt: string;
  leaveAt: string;
}
export class History extends BaseEntity {
  constructor(data: IHistory) {
    super();
    this.tableName = "user";
    this.id = data.id;
    this.meetingId = data.meetingId;
    this.userId = data.userId;
    this.joinAt = data.joinAt;
    this.leaveAt = data.leaveAt;
  }

  id: number;

  meetingId: string;

  userId: string;

  joinAt: string;

  leaveAt: string;

  findQuery(): string {
    return `SELECT * FROM ${this.tableName}`;
  }
  insertQuery(): string {
    return `
            INSERT 
            INTO  
                ${this.tableName} 
            VALUES (
                id='${this.id}',
                meetingId='${this.meetingId}',
                userId='${this.userId}',
                joinAt='${this.joinAt}',
                leaveAt='${this.leaveAt}'
            )`;
  }
  updateQuery(column: string, value: any): string {
    return `
            UPDATE 
                ${this.tableName} 
            SET 
              
                meetingId='${this.meetingId}',
                userId='${this.userId}',
                joinAt='${this.joinAt}',
                leaveAt='${this.leaveAt}'
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
