import { IContact, IUser } from ".";
import { NextFunction } from "express";
import { NotFound } from "http-errors";

const hasError = (checkObject: IContact | IUser | Error) => {
  if (checkObject instanceof Error || !checkObject) {
    return true;
  }

  return false;
};

const responseWithError = async (
  checkObject: IContact | IUser | Error,
  next: NextFunction
) => {
  if (checkObject instanceof Error) {
    next(checkObject);
  }

  if (!checkObject) {
    next(new NotFound(`Not found`));
  }
};

export { hasError, responseWithError };
