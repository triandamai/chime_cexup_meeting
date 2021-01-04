/**
 * Date     10 December 2020
 * Time     09:00
 * Author   Trian Damai
 * */
import { v4 as uuid } from "uuid";
interface ObjectDescriptor {
  [key: string]: any;
}

interface Where {
  column: string;
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
interface QueryResult {
  success: boolean;
  data?: any;
  dataCount?: number;
  affectedRows?: number;
  insertId?: number;
  message?: string;
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
 * @return query WHERE  columnname = value OR columnname = value AND columnname = value
 * */
const qwhere = (data: { data: Where; type: WhereType }): string => {
  let val =
    typeof data.data.value == "string"
      ? data.data.value.toString()
      : data.data.value;
  let type =
    data.type == WhereType.WHERE
      ? ""
      : data.type == WhereType.ORWHERE
      ? trailing.OR
      : trailing.AND;

  return `${type} ${builder.WHERE} ${data.data.column}${builder.EQUAL}'${val}'`;
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

export {
  qget,
  qgetall,
  qinsert,
  qupdate,
  qwhere,
  qjoin,
  uuid,
  ObjectDescriptor,
  ResultType,
  ResultBuilder,
  Where,
  WhereType,
  JoinType,
  QueryResult
};
