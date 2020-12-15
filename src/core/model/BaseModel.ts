/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */

import { connection, database, IDatabase } from "..";
import { Request } from "express";
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
  qwhere
} from "..";

/**
 * class base models
 * @param tableName
 * @param query
 * @param QueryBuilder
 * @returns model with querybuilder for extends
 * */
abstract class BaseModel implements IDatabase {
  protected tableName: string = "";
  protected query = "";

  constructor() {
    database.connect();
  }
  /**
   * get all data
   * @param tableName
   * @returns results of all data from database
   * */
  public getAll(): BaseModel {
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
        value: data.value
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
  public async write() {
    return new Promise((resolve, reject) => {
      connection.query(this.query, (err, results, fields) => {
        if (err) {
          reject(
            this.result({
              res: ResultType.ERROR,
              data: null,
              err: err,
              field: null //fields
            })
          );
        } else {
          resolve(
            this.result({
              res: ResultType.SUCCESS,
              data: results,
              err: err,
              field: null //fields
            })
          );
        }
      });
      this.query = "";
    });
  }

  /**
   * executing find query
   *
   * @param null
   * @returns async as result execution
   * ex:
   *
   * */
  public async find() {
    return new Promise((resolve, reject) => {
      connection.query(this.query, (err, results, fields) => {
        if (err) {
          reject(
            this.result({
              res: ResultType.ERROR,
              data: null,
              err: err,
              field: null //fields
            })
          );
        } else {
          resolve(
            this.result({
              res: ResultType.SUCCESS,
              data: results,
              err: err,
              field: null //fields
            })
          );
        }
      });
      this.query = "";
    });
  }
  /**
   * Result from execute query
   *
   */
  private result(data: {
    res: ResultType;
    data: any;
    err: any;
    field: any;
  }): ResultBuilder {
    return {
      result: data.res,
      payload: data,
      error: data.err,
      fields: data.field
    };
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
        .where({ column: "asociatedId", value: data })
        .find()
        .then((res: any) => {
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
    console.log("DATABASE ON = ", msg);
  }
}
export { BaseModel };
