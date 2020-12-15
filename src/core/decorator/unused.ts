// target.prototype.get = function (data: Array<string>) {
//     target.prototype.query += qget({
//       tableName: opt.tableName,
//       data: data
//     });
//   };
//   target.prototype.getall = function () {
//     target.prototype.query += qgetall({
//       tableName: opt.tableName
//     });
//   };
//   target.prototype.insert = function (data: any) {
//     target.prototype.query += qinsert({
//       table: opt.tableName,
//       data
//     });
//   };
//   target.prototype.where = function (data: { column: string; value: any }) {
//     target.prototype.query += qwhere({
//       data: {
//         column: data.column,
//         value: data.value
//       },
//       type: WhereType.WHERE
//     });
//   };
//   target.prototype.orwhere = function (data: Where) {
//     target.prototype.query += qwhere({
//       data: {
//         column: data.column,
//         value: data.value
//       },
//       type: WhereType.ORWHERE
//     });
//   };
//   target.prototype.andwhere = function (data: Where) {
//     target.prototype.query += qwhere({
//       data: {
//         column: data.column,
//         value: data.value
//       },
//       type: WhereType.ANDWHETE
//     });
//   };
//   target.prototype.join = function (join: { withTable: string; on: string }) {
//     target.prototype.query += qjoin({
//       table: join.withTable,
//       on: join.on,
//       type: JoinType.LEFT
//     });
//   };
//   target.prototype.leftjoin = function (join: {
//     withTable: string;
//     on: string;
//   }) {
//     target.prototype.query += qjoin({
//       table: join.withTable,
//       on: join.on,
//       type: JoinType.LEFT
//     });
//   };
//   target.prototype.rightjoin = function (join: {
//     withTable: string;
//     on: string;
//   }) {
//     target.prototype.query += qjoin({
//       table: join.withTable,
//       on: join.on,
//       type: JoinType.RIGHT
//     });
//   };
//   target.prototype.fulljoin = function (join: {
//     withTable: string;
//     on: string;
//   }) {
//     target.prototype.query += qjoin({
//       table: join.withTable,
//       on: join.on,
//       type: JoinType.FULL
//     });
//   };
