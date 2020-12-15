import { Router } from "express";

export const appRouter = Router();

enum method {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete"
}
interface IOptions {
  path: string;
  middlewares?: any[];
}

function Post(options: IOptions) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    (appRouter as any)[method.post](options.path, target[propertyKey]);
  };
}
function Get(options: IOptions) {
  return (target: any, proptyKey: string, descriptor: PropertyDescriptor) => {
    (appRouter as any)[method.get](options.path, target[proptyKey]);
  };
}
function Put(options: IOptions) {
  return (target: any, proptyKey: string, descriptor: PropertyDescriptor) => {
    (appRouter as any)[method.put](options.path, target[proptyKey]);
  };
}
function Delete(options: IOptions) {
  return (target: any, proptyKey: string, descriptor: PropertyDescriptor) => {
    (appRouter as any)[method.delete](options.path, target[proptyKey]);
  };
}

export { Post, Get, Put, Delete };
