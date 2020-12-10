import { resolve } from "url";
/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */

import db from "../connection/db";
import { QueryBuilder, ObjectDescriptor } from "./QueryBuilder";

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
  protected getAll() {
    this.query += this.builder.qgetall({ tableName: this.tableName });
  }
  /**
   * get all data
   * @param tableName
   * @param data Array string ex: name as nama
   * @returns results data from database with specific column
   * ex:
   *
   * */
  protected get(data: Array<string>) {
    this.query += this.builder.qget({ tableName: this.tableName, data: data });
  }
  /**
   * insert data
   *
   * @param data
   * @returns insert into database
   * ex:
   *
   * */
  protected insert(data: any) {
    this.query += this.builder.qinsert({ table: this.tableName, data: data });
  }
  /**
   * update data
   * !should add where,orwhere,andwhere
   * @param data
   * @returns insert into database
   * ex:
   *
   * */
  protected update(data: any) {
    this.query += this.builder.qupdate({ table: this.tableName, data: data });
  }

  /**
   * executing modification query
   *
   * @param null
   * @returns async as result execution
   * ex:
   *
   * */
  protected write(): Promise<void> {
    return new Promise((resolve, reject) => {
      db.query(this.query, (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve();
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
  protected find(): Promise<void> {
    return new Promise((resolve, reject) => {
      db.query(this.query, (err, results, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    this.query = "";
  }
}
