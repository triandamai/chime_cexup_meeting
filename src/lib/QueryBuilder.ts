/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */

interface ObjectDescriptor {
  [key: string]: any;
}
interface trailingwhere {
  condition: where;
  withcondition: where;
}
interface where {
  column: any;
  value: any;
}
interface RequestQuery {
  table: string;
  data: ObjectDescriptor;
}
enum builder {
  INSERT = "INSERT INTO",
  UPDATE = "UPDATE",
  GETALL = "SELECT * FROM",
  GET = "SELECT",
  SET = "SET ?",
  WHERE = "WHERE",
  EQUAL = "="
}
enum trailing {
  AND = "AND",
  OR = "OR"
}
class QueryBuilder {
  constructor() {}

  /**
   * get query getall
   * @param tableName
   * @returns query get SELECT * FROM tablename
   * */
  qgetall(data: { tableName: string }) {
    return builder.GET + ` ${data.tableName} `;
  }
  /**
   * get query insert
   * @param Array<tableName or as>
   * @returns query get tablename or as alias,
   * */
  qget(data: { tableName: string; data: Array<string> }) {
    let result: string = builder.GET;
    data.data.map((item, index) => {
      let trailinComma = data.data.length - 1 == index ? " " : ",";
      result += `${item} ${trailinComma}`;
    });
    return result;
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
    return `${data.column} = ${data.value}`;
  }
  /**
   * get where condition
   * @param where = column = value
   * @param where = column = value
   * @returns query WHERE  columnname = value OR columnname = value
   * */
  orwhere(data: trailingwhere): string {
    return `${data.condition.column} ${builder.EQUAL} ${data.condition.value} ${trailing.OR} ${data.withcondition.column} ${builder.EQUAL} ${data.withcondition.value}`;
  }
  /**
   * get where condition
   * @param where = column = value
   * @param where = column = value
   * @returns query WHERE  columnname = value AND columnname = value
   * */
  andwhere(data: trailingwhere): string {
    return `${data.condition.column} ${builder.EQUAL} ${data.condition.value} ${trailing.AND} ${data.withcondition.column} ${builder.EQUAL} ${data.withcondition.value}`;
  }
}
export { QueryBuilder, ObjectDescriptor };
