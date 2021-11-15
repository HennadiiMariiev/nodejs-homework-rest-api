import { Request } from "express";

const isFavoriteInRequest = (req: Request) => {
  if (
    "favorite" in req.query &&
    (req.query.favorite === "true" || req.query.favorite === "false")
  ) {
    return true;
  }
  return false;
};

const isValidPaginationInRequest = (req: Request) => {
  if ("page" in req.query && "limit" in req.query) {
    const page = Number(req.query.page as string);
    const limit = Number(req.query.limit as string);

    if (page > 0 && limit > 0) {
      return true;
    }
  }

  return false;
};

const getPageAndLimitFromRequest = (req: Request) => {
  const page = Number(req.query.page as string);
  const limit = Number(req.query.limit as string);

  return { page, limit };
};

export {
  isFavoriteInRequest,
  isValidPaginationInRequest,
  getPageAndLimitFromRequest,
};
