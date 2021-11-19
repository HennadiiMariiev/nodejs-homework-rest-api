import { Request, Response, NextFunction } from "express";
import { BadRequest } from "http-errors";
import { responseErrorOrNext, validateObject, isValidId } from "../helpers";
import { joiContactSchema } from "../model";

const contactIdValidation = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const contactId: string = req.params.contactId;

  !isValidId(contactId)
    ? next(new BadRequest("Requested Id is not valid"))
    : next();
};

const addContactValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requiredFields = ["name", "email", "phone"];

  const { error } = validateObject(req.body, joiContactSchema, requiredFields);

  responseErrorOrNext(error, res, next);
};

const updateContactValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateObject(req.body, joiContactSchema);

  if (Object.keys(req.body).length === 0) {
    next(new BadRequest("Empty request's body"));
  }

  responseErrorOrNext(error, res, next);
};

const updateStatusContactValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateObject(req.body, joiContactSchema, ["favorite"]);

  responseErrorOrNext(error, res, next);
};

export {
  addContactValidation,
  updateContactValidation,
  updateStatusContactValidation,
  contactIdValidation,
};
