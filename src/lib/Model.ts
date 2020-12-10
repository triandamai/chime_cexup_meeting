import { resolve } from "url";
/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */

import db from "../connection/db";
import { QueryBuilder } from "./QueryBuilder";
export default abstract class name {
  abstract tableName: string = "";
  private builder: QueryBuilder;
  constructor() {
    this.builder = new QueryBuilder();
  }
  protected insert(data: any): Promise<void> {
    return new Promise((resolve, reject) => {});
  }
  protected update(data: any): Promise<void> {
    return new Promise((resolve, reject) => {});
  }
}
