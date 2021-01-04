import { Request, Response } from "express";
class Middleware {
  constructor() {}
  public auth(req: Request, res: Response, next: Function) {
    if (req.headers.authorization) {
      if (req.headers.authorization == "") return next();
      return res.status(400).json({ message: "Authorization needed" });
    } else {
      return res.status(400).json({ message: "method not allowed" });
    }
  }
}
