import { IContact, IUser } from ".";
import { NextFunction } from "express";
import { NotFound } from "http-errors";

const hasErrorOrNull = (obj: IContact | IUser | Error): boolean => {
  return obj instanceof Error || !obj;
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

export { hasErrorOrNull, responseWithError };
