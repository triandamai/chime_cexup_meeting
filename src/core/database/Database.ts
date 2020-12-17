/**
 * Date     11 December 2020
 * Time     10:51
 * Author   Trian Damai
 * */
import { createConnection, Connection } from "mysql";

import * as dotenv from "dotenv";
dotenv.config();

interface IDatabase {
  log(msg: any): void;
}
class Database {
  private db: Connection;
  private Idb: IDatabase;
  constructor(idb: IDatabase) {
    this.connect();
    this.Idb = idb;
  }
  public connect() {
    this.db = createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD
    });
    this.db.on("connect", err => {
      this.Idb.log(err);
    });
    this.db.on("error", err => {
      this.Idb.log(err);
    });
    this.db.on("enqueue", err => {
      this.Idb.log(err);
    });
  }
  public getConnection(): Connection {
    return this.db;
  }
}

const database = new Database({
  log(msg) {
    //   console.log("Database ", msg);
  }
});

const connection = database.getConnection();

export { connection, database, Database, IDatabase };
