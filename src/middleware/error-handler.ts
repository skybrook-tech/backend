import { Request, Response, NextFunction } from "express";

interface ErrorObject {
  status: number;
  message: string;
  code: string;
}

const errorHandler = (error: ErrorObject, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.set("Content-Type", "application/json");
  res.status(error.status).json({ error });
};

export default errorHandler;
