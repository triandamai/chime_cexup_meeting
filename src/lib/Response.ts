/**
 * Date     05 December 2020
 * Time     21:31
 * Author   Trian Damai
 * */
class response {
  constructor() {}
  static success(res: any, message: any, data: any) {
    res.status(200).json({
      code: 200,
      message: message || "success",
      data: data
    });
  }
  static error(res: any, message: any, data: any) {
    res.status(500).json({
      code: 500,
      message: message || "error",
      data: data
    });
  }
}

export default response;
