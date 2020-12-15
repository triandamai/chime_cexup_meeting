import { connection } from "..";
function Model(opt: IModelOption) {
  return function (target) {
    target.prototype.get = function (data: Array<string>) {
      target.prototype.query += qget({
        tableName: opt.tableName,
        data: data
      });
    };
    target.prototype.getall = function () {
      target.prototype.query += qgetall({
        tableName: opt.tableName
      });
    };
    target.prototype.insert = function (data: any) {
      target.prototype.query += qinsert({
        table: opt.tableName,
        data
      });
    };
    target.prototype.where = function (data: { column: string; value: any }) {
      target.prototype.query += qwhere({
        data: {
          column: data.column,
          value: data.value
        },
        type: WhereType.WHERE
      });
    };
    target.prototype.orwhere = function (data: Where) {
      target.prototype.query += qwhere({
        data: {
          column: data.column,
          value: data.value
        },
        type: WhereType.ORWHERE
      });
    };
    target.prototype.andwhere = function (data: Where) {
      target.prototype.query += qwhere({
        data: {
          column: data.column,
          value: data.value
        },
        type: WhereType.ANDWHETE
      });
    };
    target.prototype.join = function (join: { withTable: string; on: string }) {
      target.prototype.query += qjoin({
        table: join.withTable,
        on: join.on,
        type: JoinType.LEFT
      });
    };
    target.prototype.leftjoin = function (join: {
      withTable: string;
      on: string;
    }) {
      target.prototype.query += qjoin({
        table: join.withTable,
        on: join.on,
        type: JoinType.LEFT
      });
    };
    target.prototype.rightjoin = function (join: {
      withTable: string;
      on: string;
    }) {
      target.prototype.query += qjoin({
        table: join.withTable,
        on: join.on,
        type: JoinType.RIGHT
      });
    };
    target.prototype.fulljoin = function (join: {
      withTable: string;
      on: string;
    }) {
      target.prototype.query += qjoin({
        table: join.withTable,
        on: join.on,
        type: JoinType.FULL
      });
    };
  };
}

interface IModel {
  get(data: Array<string>): IModel;
  getall(): IModel;
  insert(data: any): IModel;
  update(data: any): IModel;
  where(data: { column: string; value: any }): IModel;
  orwhere(data: Where): IModel;
  andwhere(data: Where): IModel;
  join(join: { withTable: string; on: string }): IModel;
  leftjoin(join: { withTable: string; on: string }): IModel;
  rightjoin(join: { withTable: string; on: string }): IModel;
  fulljoin(join: { withTable: string; on: string }): IModel;
  run(): Promise<any>;
}
interface IModelOption {
  tableName: string;
}
/**
 * Date     10 December 2020
 * Time     09:00
 * Author   Trian Damai
 * */

interface ObjectDescriptor {
  [key: string]: any;
}

interface Where {
  column: any;
  value: any;
}
interface RequestQuery {
  table: string;
  data: ObjectDescriptor;
}
interface ResultBuilder {
  result: ResultType;
  payload: any;
  error: any;
  fields: any;
}
enum builder {
  INSERT = "INSERT INTO",
  UPDATE = "UPDATE",
  GETALL = "SELECT *",
  GET = "SELECT",
  SET = "SET ",
  Q = "?",
  WHERE = "WHERE",
  EQUAL = "=",
  FROM = "FROM",
  JOIN = "JOIN",
  ON = "ON",
  OUTER = "OUTER"
}
enum trailing {
  AND = "AND",
  OR = "OR"
}
enum ResultType {
  SUCCESS = "success",
  FAILED = "failed",
  ERROR = "error"
}
enum JoinType {
  INNER = "INNER",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
  FULL = "FULL"
}
enum WhereType {
  WHERE = "WHERE",
  ORWHERE = "OR WHERE",
  ANDWHETE = "AND WHERE"
}

/**
 * get query getall
 * @param tableName
 * @returns query get SELECT * FROM tablename
 * */
const qgetall = (data: { tableName: string }) => {
  return `${builder.GETALL} ${builder.FROM} ${data.tableName} `;
};
/**
 * get query insert
 * @param Array<tableName or as>
 * @returns query get tablename or as alias,
 * */
const qget = (data: { tableName: string; data: Array<string> }): string => {
  let result: string = ` ${builder.GET} `;
  data.data.map((item, index) => {
    let trailinComma = data.data.length - 1 == index ? " " : ",";
    result += `${item} ${trailinComma}`;
  });
  return (result += `${builder.FROM} ${data.tableName} `);
};
/**
 * get query insert
 * @param RequestQuery
 * @returns query insert = INSERT into tablename SET ?
 * */
const qinsert = (data: RequestQuery): string => {
  let result: string = builder.INSERT + ` ${data.table} ` + builder.SET + ` `;
  let objectName = Object.keys(data.data);
  objectName.map((item, index) => {
    let trailinComma = objectName.length - 1 == index ? " " : ",";
    typeof data.data[item] == "string"
      ? (result +=
          item + builder.EQUAL + "'" + data.data[item] + "'" + trailinComma)
      : (result += item + builder.EQUAL + data.data[item] + trailinComma);
  });
  return result;
};

/**
 * get query update
 * @param RequestQuery
 * @returns query update = UPDATE tablename SET ?
 * */
const qupdate = (data: RequestQuery): string => {
  let result: string = builder.UPDATE + ` ${data.table} ` + builder.SET;
  let objectName = Object.keys(data.data);
  objectName.map((item, index) => {
    let trailinComma = objectName.length - 1 == index ? " " : ",";
    typeof data.data[item] == "string"
      ? (result += item + builder.EQUAL + data.data[item] + trailinComma)
      : (result += item + builder.EQUAL + data.data[item] + trailinComma);
  });
  return result;
};
/**
 * get where condition
 * @param data {column,value}
 * @param type
 * @returns query WHERE  columnname = value OR columnname = value AND columnname = value
 * */
const qwhere = (data: { data: Where; type: WhereType }): string => {
  let val =
    typeof data.data.value == "string" ? `${data.data.value}` : data.data.value;
  let type =
    data.type == WhereType.WHERE
      ? ""
      : data.type == WhereType.ORWHERE
      ? trailing.OR
      : trailing.AND;

  return `${type} ${builder.WHERE} ${data.data.column} ${builder.EQUAL} ${val}`;
};

/**
 * join table
 * @param table
 * @param on
 * @param type
 * @returns query {LEFT,FULL OUTER,RIGHT} JOIN table name ON table.fk
 * */
const qjoin = (data: { table: string; on: string; type: JoinType }): string => {
  return `${data.type} ${data.type == JoinType.FULL ? builder.OUTER : ""} ${
    builder.JOIN
  } ${data.table} ${builder.ON} ${data.on}`;
};

abstract class BaseModel {
  // abstract query = "";
  public run = async function () {
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
  };
}
export {
  qget,
  qgetall,
  qinsert,
  qupdate,
  qwhere,
  qjoin,
  builder,
  ObjectDescriptor,
  ResultType,
  ResultBuilder,
  Where,
  WhereType,
  JoinType,
  Model,
  IModel,
  IModelOption
};
