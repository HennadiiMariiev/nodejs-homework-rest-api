import Joi from "joi";
import { Response, NextFunction } from "express";
import { BadRequest } from "http-errors";

const responseErrorOrNext = (
  error: Joi.ValidationError | undefined,
  _: Response,
  next: NextFunction
) => {
  if (error) {
    const { message } = error.details[0];
    next(new BadRequest(message));
  }

  next();
};

export { responseErrorOrNext };
