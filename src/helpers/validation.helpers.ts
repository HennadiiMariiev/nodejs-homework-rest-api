import joi, { ValidationResult } from "joi";
import { Types } from "mongoose";
import { IContact, IUser } from ".";

const isValidId = (id: string): boolean => Types.ObjectId.isValid(id);

const validateObject = (
  contact: IContact | IUser,
  joiSchema: joi.ObjectSchema<object>,
  requiredFields: string[] = []
): ValidationResult => {
  let objectSchema: joi.ObjectSchema<object> = Object.create(joiSchema);

  objectSchema = objectSchema.fork(requiredFields, (field) => field.required());

  return objectSchema.validate(contact);
};

export { validateObject, isValidId };
