import { Request, Response, NextFunction } from "express";
import { callbackFunction } from ".";

const asyncWrapper = (callbacks: Array<callbackFunction>) =>
  callbacks.map(
    (callback) => async (req: Request, res: Response, next: NextFunction) => {
      try {
        return callback(req, res, next);
      } catch (error) {
        next(error);
      }
    }
  );
export { asyncWrapper };
