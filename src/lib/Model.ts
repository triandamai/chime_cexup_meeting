/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */

import db from "../connection/db";
import { QueryBuilder, ResultBuilder, ResultType, where } from "./QueryBuilder";

/**
 * class base models
 * @param tableName
 * @param query
 * @param QueryBuilder
 * @returns model with querybuilder ready
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
      column: data.column,
      value: data.value
    });
    return this;
  }
  /**
   * */
  public orwhere(data: where): Model {
    this.query += this.builder.orwhere({
      column: data.column,
      value: data.value
    });
    return this;
  }
  /**
   * */
  public andwhere(data: where): Model {
    this.query += this.builder.orwhere({
      column: data.column,
      value: data.value
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
}
