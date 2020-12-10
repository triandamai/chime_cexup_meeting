/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */
import { createConnection, Connection } from "mysql";

import * as dotenv from "dotenv";
dotenv.config();

class Database {
  public db: Connection;
  constructor() {
    this.db = createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME
    });
  }
}

export default new Database().db;
