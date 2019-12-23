import { Request } from "express";

declare namespace Express {
  export interface Response {
    locals: any;
  }
}
