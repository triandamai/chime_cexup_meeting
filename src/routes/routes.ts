/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */

import * as express from "express";
const router = express.Router();
import { QueryBuilder } from "../lib/QueryBuilder";

router.get("/", (req: express.Request, res: express.Response) => {
  let q = new QueryBuilder();

  res.send("hanya tes");
});
export default router;
