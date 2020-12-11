/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */

import { resolve } from "url";
import db from "../connection/db";
import {
  QueryBuilder,
  ResultBuilder,
  ResultType,
  Where,
  WhereType,
  JoinType
} from "./QueryBuilder";

/**
 * class base models
 * @param tableName
 * @param query
 * @param QueryBuilder
 * @returns model with querybuilder for extends
 * */
export default abstract class Model {
  abstract tableName: string = "";
  protected query = "";
  private builder: QueryBuilder;
  constructor() {
    this.builder = new QueryBuilder();
  }
  /**
   * get all data
   * @param tableName
   * @returns results of all data from database
   * */
  public getAll(): Model {
    this.query += this.builder.qgetall({ tableName: this.tableName });
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
  public get(data: Array<string>): Model {
    this.query += this.builder.qget({ tableName: this.tableName, data: data });
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
  public insert(data: any): Model {
    this.query += this.builder.qinsert({ table: this.tableName, data: data });
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
  public update(data: any): Model {
    this.query += this.builder.qupdate({ table: this.tableName, data: data });
    return this;
  }
  /**
   *
   *
   * */
  public where(data: { column: string; value: any }): Model {
    this.query += this.builder.where({
      data: {
        column: data.column,
        value: data.value
      },
      type: WhereType.WHERE
    });
    return this;
  }
  /**
   * */
  public orwhere(data: Where): Model {
    this.query += this.builder.where({
      data: {
        column: data.column,
        value: data.value
      },
      type: WhereType.ORWHERE
    });
    return this;
  }
  /**
   * */
  public andwhere(data: Where): Model {
    this.query += this.builder.where({
      data: {
        column: data.column,
        value: data.value
      },
      type: WhereType.ANDWHETE
    });
    return this;
  }
  //
  public join(join: { withTable: string; on: string }): Model {
    this.query += this.builder.join({
      table: join.withTable,
      on: join.on,
      type: JoinType.LEFT
    });
    return this;
  }
  //
  public leftJoin(join: { withTable: string; on: string }): Model {
    this.query += this.builder.join({
      table: join.withTable,
      on: join.on,
      type: JoinType.LEFT
    });
    return this;
  }
  public rightJoin(join: { withTable: string; on: string }): Model {
    this.query += this.builder.join({
      table: join.withTable,
      on: join.on,
      type: JoinType.LEFT
    });
    return this;
  }
  public fullJoin(join: { withTable: string; on: string }): Model {
    this.query += this.builder.join({
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
      db.query(this.query, (err, results, fields) => {
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
      db.query(this.query, (err, results, fields) => {
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
    });
    this.query = "";
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
  public makeid(length: number) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /**
   * cek if id exists
   * @param null
   * @returns available id
   * */
  public async cekId() {
    return new Promise((resolve, reject) => {
      let data = this.makeid(6);
      this.getAll()
        .where({ column: "asociatedId", value: data })
        .find()
        .then((res: any) => {
          if (res.result == ResultType.SUCCESS) {
            if (res.result.payload.length > 0) {
              this.cekId();
            } else {
              resolve(data);
            }
          } else {
            this.cekId();
          }
        })
        .catch(err => {
          this.cekId();
        });
    });
  }
}
