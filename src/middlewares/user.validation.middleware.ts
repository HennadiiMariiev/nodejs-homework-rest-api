import { Request, Response, NextFunction } from "express";
import { responseErrorOrNext, validateObject } from "../helpers";
import { joiUserSchema } from "../model";

const userValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requiredFields = ["email", "password"];

  const { error } = validateObject(req.body, joiUserSchema, requiredFields);

  responseErrorOrNext(error, res, next);
};

const userEmailValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = validateObject(req.body, joiUserSchema, ["email"]);

  responseErrorOrNext(error, res, next);
};

export { userValidation, userEmailValidation };
