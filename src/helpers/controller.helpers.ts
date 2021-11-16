import { IContact, IUser } from ".";
import { NextFunction } from "express";
import { NotFound } from "http-errors";

const hasError = (obj: IContact | IUser | Error): boolean => {
  return obj instanceof Error;
};

const responseWithError = async (
  obj: IContact | IUser | Error,
  next: NextFunction
) => {
  if (obj instanceof Error) {
    next(obj);
  }

  if (!obj) {
    next(new NotFound(`Not found`));
  }
};

export { hasError, responseWithError };
