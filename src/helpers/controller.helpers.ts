import { NextFunction } from "express";
import { NotFound } from "http-errors";
import { IContact, IUser } from ".";

const isErrorOrNull = (obj: IContact | IUser | Error): boolean => {
  return obj instanceof Error || obj === null;
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

export { isErrorOrNull, responseWithError };
