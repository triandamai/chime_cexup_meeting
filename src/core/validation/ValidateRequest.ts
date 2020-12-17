/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */
import { Request } from "express";
/**
 *
 * */

interface validationResult {
  next: boolean;
  message?: Array<string>;
}
type TypeData = "string" | "number" | "boolean";
interface validateField {
  field: any;
  type?: TypeData;
  required?: boolean;
}

function validateRoute(
  req: Request,
  data: Array<validateField>
): validationResult {
  let request = req.body;
  let messages: Array<string> = [];

  if (typeof request != "undefined") {
    data.map((item, index) => {
      const data: any = request[item.field] ? request[item.field] : null;
      if (item.required) {
        if (data) {
          if (typeof data !== item.type) {
            //required but type did not match
            messages.push(
              `${item.field} expected as ${item.type} but got ${typeof request[
                item.field
              ]}`
            );
          }
        } else {
          //required but null
          messages.push(
            `${item.field} is required but got ${request[item.field]}`
          );
        }
      } else {
        if (data) {
          if (typeof data !== item.type) {
            //not required but data exist wrong type
            messages.push(
              `${item.field} expected as ${item.type} but got ${typeof request[
                item.field
              ]}`
            );
          }
        }
      }
    });
  } else {
    messages.push(`body of null ${request}`);
  }

  if (messages.length > 0) {
    return { next: false, message: messages };
  } else {
    return { next: true, message: null };
  }
}
async function validateRequest(
  req: Request,
  data: Array<validateField>
): Promise<validationResult> {
  let request = req.body;
  let messages: Array<string> = [];

  if (typeof request != "undefined") {
    data.map((item, index) => {
      const data: any = request[item.field] ? request[item.field] : null;
      if (item.required) {
        if (data) {
          if (typeof data !== item.type) {
            //required but type did not match
            messages.push(
              `${item.field} expected as ${item.type} but got ${typeof request[
                item.field
              ]}`
            );
          }
        } else {
          //required but null
          messages.push(
            `${item.field} is required but got ${request[item.field]}`
          );
        }
      } else {
        if (data) {
          if (typeof data !== item.type) {
            //not required but data exist wrong type
            messages.push(
              `${item.field} expected as ${item.type} but got ${typeof request[
                item.field
              ]}`
            );
          }
        }
      }
    });
  } else {
    messages.push(`body of null ${request}`);
  }

  if (messages.length > 0) {
    return { next: false, message: messages };
  } else {
    return { next: true, message: null };
  }
}
function validateGet(req: Request, data: Array<validateField>) {
  let request = req.params;
  let messages: Array<string> = [];
  data.map((item, index) => {
    if (item.required) {
      if (request[item.field]) {
        if (typeof request[item.field] !== item.type) {
          //required but type did not match
          messages.push(
            `${item.field} expected as ${item.type} but got ${typeof request[
              item.field
            ]}`
          );
        }
      } else {
        //required but null
        messages.push(`${item.field} is required ${request[item.field]}`);
      }
    } else {
      if (request[item.field]) {
        if (typeof request[item.field] !== item.type) {
          //not required but data exist wrong type
          messages.push(
            `${item.field} expected as ${item.type} but got ${typeof request[
              item.field
            ]}`
          );
        }
      }
    }
  });
  if (messages.length > 0) {
    return { next: false, message: messages };
  } else {
    return { next: true, message: null };
  }
}

export { validateRequest, validateGet, validateRoute, TypeData };
