/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */

import {
  ResultBuilder,
  ResultType,
  Where,
  WhereType,
  JoinType,
  qget,
  qgetall,
  qinsert,
  qupdate,
  qjoin,
  qwhere,
  QueryResult,
  connection,
  database,
  IDatabase
} from "..";
import {} from "mysql";
import * as dotenv from "dotenv";
dotenv.config();

/**
 * class base models
 * @param tableName
 * @param query
 * @param QueryBuilder
 * @returns model with querybuilder for extends
 * */
abstract class BaseModel implements IDatabase {
  public abstract tableName: string = "";
  protected query: string = "";
  protected isWriteData: boolean;

  constructor() {
    database.connect();
  }
  /**
   * get all data
   * @param tableName
   * @returns results of all data from database
   * */
  public getAll(): BaseModel {
    this.isWriteData = false;
    this.query += qgetall({ tableName: this.tableName });
    return this;
  }
  /**
   * get all data
   * @param tableName
   * @param data Array string ex: name as nama
   * @returns results data from database with specific column
   * ex:
   *
   * */
  public get(data: Array<string>): BaseModel {
    this.isWriteData = false;
    this.query += qget({ tableName: this.tableName, data: data });
    return this;
  }
  /**
   * insert data
   *
   * @param data
   * @returns insert into database
   * ex:
   *
   * */
  public insert(data: any): BaseModel {
    this.isWriteData = true;
    this.query += qinsert({ table: this.tableName, data: data });
    return this;
  }
  /**
   * update data
   * !should add where,orwhere,andwhere
   * @param data
   * @returns insert into database
   * ex:
   *
   * */
  public update(data: any): BaseModel {
    this.isWriteData = true;
    this.query += qupdate({ table: this.tableName, data: data });
    return this;
  }
  /**
   * where query
   * @param column
   * @param value
   * @returns WHERE column = value
   * */
  public where(data: { column: string; value: any }): BaseModel {
    this.query += qwhere({
      data: {
        column: data.column,
        value: typeof data.value == "string" ? `${data.value}` : data.value
      },
      type: WhereType.WHERE
    });
    return this;
  }
  /**
   * where query
   * @param column
   * @param value
   * @returns OR WHERE column = value
   * */
  public orwhere(data: Where): BaseModel {
    this.query += qwhere({
      data: {
        column: data.column,
        value: data.value
      },
      type: WhereType.ORWHERE
    });
    return this;
  }
  /**
   * where query
   * @param column
   * @param value
   * @returns AND WHERE column = value
   * */
  public andwhere(data: Where): BaseModel {
    this.query += qwhere({
      data: {
        column: data.column,
        value: data.value
      },
      type: WhereType.ANDWHETE
    });
    return this;
  }
  /**
   * where query
   * @param table
   * @param on
   * @returns JOIN table ON table.fk
   * */
  public join(join: { withTable: string; on: string }): BaseModel {
    this.query += qjoin({
      table: join.withTable,
      on: join.on,
      type: JoinType.LEFT
    });
    return this;
  }
  /**
   * where query
   * @param table
   * @param on
   * @returns LEFT JOIN table ON table.fk
   * */
  public leftJoin(join: { withTable: string; on: string }): BaseModel {
    this.query += qjoin({
      table: join.withTable,
      on: join.on,
      type: JoinType.LEFT
    });
    return this;
  }
  /**
   * where query
   * @param table
   * @param on
   * @returns RIGHT JOIN table ON table.fk
   * */
  public rightJoin(join: { withTable: string; on: string }): BaseModel {
    this.query += qjoin({
      table: join.withTable,
      on: join.on,
      type: JoinType.LEFT
    });
    return this;
  }
  /**
   * where query
   * @param table
   * @param on
   * @returns  FULL OUTER JOIN table ON table.fk
   * */
  public fullJoin(join: { withTable: string; on: string }): BaseModel {
    this.query += qjoin({
      table: join.withTable,
      on: join.on,
      type: JoinType.LEFT
    });
    return this;
  }
  /**
   * executing modification query
   *
   * @param null
   * @returns async as result execution
   * ex:
   *
   * */
  public async run(): Promise<QueryResult> {
    let payload: QueryResult;
    this.log("executing run");
    return new Promise<QueryResult>((resolve, reject) => {
      this.log(`QUERY => ` + this.query);
      connection.query(this.query, (err, results, fields) => {
        this.log("results => " + results + " error => " + err);
        if (err) {
          resolve(
            (payload = {
              success: false,
              data: null,
              dataCount: 0,
              message: err.sqlMessage + "in " + err.sql
            })
          );
        } else {
          resolve(
            (payload = {
              success: true,
              data: results,
              dataCount: results.length,
              message: results
            })
          );
        }

        this.query = "";
      });
    });
  }

  /**
   * Generate random uniqueId
   * @param length
   * @returns randomuid
   */
  public generateId(data: { length: number }) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < data.length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.log(`Generate Id => ${result}`);
    return result;
  }

  /**
   * cek if id exists
   * @param null
   * @returns available id
   * */
  public async availableId() {
    return new Promise((resolve, reject) => {
      let data = this.generateId({ length: 6 });
      this.getAll()
        .where({ column: "externalId", value: data })
        .run()
        .then((res: any) => {
          this.log("Generate id  => " + res);
          if (res.result == ResultType.SUCCESS) {
            if (res.result.payload.length > 0) {
              resolve(this.generateId({ length: 6 }));
            } else {
              resolve(data);
            }
          } else {
            resolve(this.generateId({ length: 6 }));
          }
        })
        .catch(err => {
          this.log("Generate id error => " + err);
          resolve(this.generateId({ length: 6 }));
        });
    });
  }
  /**
   * get log from database
   * @param message
   * @returns log
   *
   */
  log(msg: any) {
    process.env.MODE == "dev"
      ? console.log(`[Model->]${this.tableName}`, msg)
      : console.log(`[APP]->PRODUCTION MODE`);
  }
}
export { BaseModel };
