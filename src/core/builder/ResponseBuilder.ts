/**
 * Date     15 December 2020
 * Time     13:29
 * Author   Trian Damai
 * */
import { response, Response } from "express";
interface data {
  res: Response;
  payload?: any;
  message?: any;
}
function sendJSON200(data: data) {
  data.res
    .status(200)
    .contentType("application/json")
    .send({
      data: data.payload,
      message: "Success"
    })
    .end();
}
function sendJSON400(data: data) {
  data.res
    .status(400)
    .contentType("application/json")
    .send({ data: data.payload, message: data.message })
    .end();
}
function sendJSON404(data: data) {
  data.res
    .status(404)
    .contentType("application/json")
    .send({ data: data.payload, message: data.message })
    .end();
}

export { sendJSON200, sendJSON400, sendJSON404 };
