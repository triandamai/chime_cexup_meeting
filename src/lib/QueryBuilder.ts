/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */

interface ObjectDescriptor {
  [key: string]: any;
}
interface trailingwhere {
  column: any;
  trailing: trailing;
  value: any;
}
interface RequestQuery {
  table: string;
  data: ObjectDescriptor;
}
enum builder {
  INSERT = "INSERT INTO",
  UPDATE = "UPDATE",
  SET = "SET ?",
  WHERE = "WHERE"
}
enum trailing {
  AND = "AND",
  OR = "OR"
}
class QueryBuilder {
  constructor() {}

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
        ? (result += `${item} = "${data.data[item]}" ${trailinComma} `)
        : (result += `${item} = ${data.data[item]} ${trailinComma} `);
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
        ? (result += `${item} = "${data.data[item]}" ${trailinComma} `)
        : (result += `${item} = ${data.data[item]} ${trailinComma} `);
    });
    return (result += builder.WHERE + ``);
  }
  where(data: trailingwhere): string {
    return `${data.column} ${data.trailing} ${data.value}`;
  }
}
export { QueryBuilder };
