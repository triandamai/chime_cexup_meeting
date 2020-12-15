/**
 * Date     15 December 2020
 * Time     13:29
 * Author   Trian Damai
 * */
import { Model, BaseModel } from "../core";

@Model({ tableName: "meeting" })
class MyModel extends BaseModel {}

export { MyModel };
