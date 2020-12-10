/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */

interface ObjectDescriptor {
  [key: string]: any;
}

interface where {
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
  SET = "SET ?",
  WHERE = "WHERE",
  EQUAL = "=",
  FROM = "FROM"
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
    let result: string = builder.INSERT + ` ${data.table} ` + builder.SET;
    let objectName = Object.keys(data.data);
    objectName.map((item, index) => {
      let trailinComma = objectName.length - 1 == index ? " " : ",";
      typeof data.data[item] == "string"
        ? (result += `${item} ${builder.EQUAL} "${data.data[item]}" ${trailinComma} `)
        : (result += `${item} ${builder.EQUAL} ${data.data[item]} ${trailinComma} `);
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
        ? (result += `${item} ${builder.EQUAL} "${data.data[item]}" ${trailinComma} `)
        : (result += `${item} ${builder.EQUAL} ${data.data[item]} ${trailinComma} `);
    });
    return (result += builder.WHERE + ``);
  }
  /**
   * get where condition
   * @param columnname
   * @param value
   * @returns query where  columnname = value
   * */
  where(data: where): string {
    let val = typeof data.value == "string" ? `${data.value}` : data.value;
    return `${builder.WHERE} ${data.column} ${builder.EQUAL} ${val}`;
  }
  /**
   * get where condition
   * @param where = column = value
   * @param where = column = value
   * @returns query WHERE  columnname = value OR columnname = value
   * */
  orwhere(data: where): string {
    let val = typeof data.value == "string" ? `${data.value}` : data.value;
    return ` ${trailing.OR} ${data.column} ${builder.EQUAL}'${val}'`;
  }
  /**
   * get where condition
   * @param where = column = value
   * @param where = column = value
   * @returns query WHERE  columnname = value AND columnname = value
   * */
  andwhere(data: where): string {
    let val = typeof data.value == "string" ? `${data.value}` : data.value;
    return ` ${trailing.AND} ${data.column} ${builder.EQUAL} ${val}`;
  }
}
export { QueryBuilder, ObjectDescriptor, ResultType, ResultBuilder, where };
