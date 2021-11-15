import { IContact } from ".";
import { NextFunction } from "express";
import { NotFound } from "http-errors";

const hasError = (checkObject: IContact | Error) => {
  if (checkObject instanceof Error || !checkObject) {
    return true;
  }

  return false;
};

const responseWithError = async (
  checkObject: IContact | Error,
  next: NextFunction
) => {
  if (checkObject instanceof Error) {
    next(checkObject);
  }

  if (!checkObject) {
    next(new NotFound(`Contact not found`));
  }
};

export { hasError, responseWithError };
