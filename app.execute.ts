/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */

import app from "./app";
import * as dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 4000;

app.run();
