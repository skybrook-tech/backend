import * as express from "express";

const defaultResponse = (req: express.Request, res: express.Response): void => {
  res.status(200).json(res.locals.response);
};

export default defaultResponse;
