import { Request } from "express";
import { Types } from "mongoose";

const isFavoriteInRequest = (req: Request): boolean => {
  return (
    "favorite" in req.query &&
    ["true", "false"].includes(req.query.favorite as string)
  );
};

const isValidPaginationInRequest = (req: Request): boolean => {
  if ("page" in req.query && "limit" in req.query) {
    const page = Number(req.query.page as string);
    const limit = Number(req.query.limit as string);

    if (page > 0 && limit > 0) {
      return true;
    }
  }
  return false;
};

const getPageAndLimitFromRequest = (
  req: Request
): { page: number; limit: number } => {
  const page = Number(req.query.page as string);
  const limit = Number(req.query.limit as string);

  return { page, limit };
};

const isValidId = (id: string): boolean => Types.ObjectId.isValid(id);

const isDuplicateKeyError = (error: unknown): boolean => {
  type errorType = { code: number };
  const { code } = error as errorType;
  return code === 11000;
};

export {
  isFavoriteInRequest,
  isValidPaginationInRequest,
  getPageAndLimitFromRequest,
  isValidId,
  isDuplicateKeyError,
};
