export default abstract class name {
  protected tableName = "";
  constructor() {}
  abstract findQuery(): string;
  abstract insertQuery(): string;
  abstract deleteQuery(column: string, value: any): string;
  abstract updateQuery(column: string, value: any): string;
}
