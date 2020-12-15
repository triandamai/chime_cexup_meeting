/**
 * Date     10 December 2020
 * Time     09:00
 * Author   Trian Damai
 * */

function Model(opt: IModelOption) {
  return function (target) {
    target.prototype.tableName = opt.tableName;
  };
}

interface IModelOption {
  tableName: string;
}

export { Model, IModelOption };
