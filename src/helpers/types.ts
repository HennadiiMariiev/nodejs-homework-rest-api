import { Request, Response, NextFunction } from "express";

export type subscriptionType = "starter" | "pro" | "business";

export type callbackFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

export type updateBodyStrings = { owner: string; favorite: boolean };

export type authType = [bearer: string, token: string];

