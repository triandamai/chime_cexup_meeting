/**
 * Date     05 December 2020
 * Time     21:31
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
class QueryBuilder {
  constructor() {}

  /**
   * get query getall
   * @param tableName
   * @returns query get SELECT * FROM tablename
   * */
  qgetall(data: { tableName: string }) {
    return `${builder.GETALL} ${builder.FROM} ${data.tableName} `;
  }
  /**
   * get query insert
   * @param Array<tableName or as>
   * @returns query get tablename or as alias,
   * */
  qget(data: { tableName: string; data: Array<string> }) {
    let result: string = ` ${builder.GET} `;
    data.data.map((item, index) => {
      let trailinComma = data.data.length - 1 == index ? " " : ",";
      result += `${item} ${trailinComma}`;
    });
    return (result += `${builder.FROM} ${data.tableName} `);
  }
  /**
   * get query insert
   * @param RequestQuery
   * @returns query insert = INSERT into tablename SET ?
   * */
  qinsert(data: RequestQuery): string {
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
  }

  /**
   * get query update
   * @param RequestQuery
   * @returns query update = UPDATE tablename SET ?
   * */
  qupdate(data: RequestQuery): string {
    let result: string = builder.UPDATE + ` ${data.table} ` + builder.SET;
    let objectName = Object.keys(data.data);
    objectName.map((item, index) => {
      let trailinComma = objectName.length - 1 == index ? " " : ",";
      typeof data.data[item] == "string"
        ? (result += item + builder.EQUAL + data.data[item] + trailinComma)
        : (result += item + builder.EQUAL + data.data[item] + trailinComma);
    });
    return result;
  }
  /**
   * get where condition
   * @param data {column,value}
   * @param type
   * @returns query WHERE  columnname = value OR columnname = value AND columnname = value
   * */
  where(data: { data: Where; type: WhereType }): string {
    let val =
      typeof data.data.value == "string"
        ? `${data.data.value}`
        : data.data.value;
    let type =
      data.type == WhereType.WHERE
        ? ""
        : data.type == WhereType.ORWHERE
        ? trailing.OR
        : trailing.AND;

    return `${type} ${builder.WHERE} ${data.data.column} ${builder.EQUAL} ${val}`;
  }

  /**
   * join table
   * @param table
   * @param on
   * @param type
   * @returns query {LEFT,FULL OUTER,RIGHT} JOIN table name ON table.fk
   * */
  join(data: { table: string; on: string; type: JoinType }): string {
    return `${data.type} ${data.type == JoinType.FULL ? builder.OUTER : ""} ${
      builder.JOIN
    } ${data.table} ${builder.ON} ${data.on}`;
  }
}
export {
  QueryBuilder,
  ObjectDescriptor,
  ResultType,
  ResultBuilder,
  Where,
  WhereType,
  JoinType
};
