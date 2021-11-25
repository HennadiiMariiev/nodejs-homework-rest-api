import { responseErrorOrNext } from "./check.helpers";
import { validateObject, isValidId } from "./validation.helpers";
import {
  isFavoriteInRequest,
  isValidPaginationInRequest,
  getPageAndLimitFromRequest,
  isDuplicateKeyError,
} from "./service.helpers";
import { isErrorOrNull, responseWithError } from "./controller.helpers";
import { asyncWrapper } from "./wrapper";
import { IContact, IError, IUser, IAvatar, IMail } from "./interfaces";
import {
  subscriptionType,
  callbackFunction,
  updateBodyStrings,
  authType,
} from "./types";
import * as patterns from "./patterns";
import { getHtmlMailContent, mailService, prepareMail } from "./sendgrid";

export {
  responseErrorOrNext,
  asyncWrapper,
  validateObject,
  isFavoriteInRequest,
  isValidPaginationInRequest,
  getPageAndLimitFromRequest,
  isValidId,
  isErrorOrNull,
  responseWithError,
  isDuplicateKeyError,
  IError,
  IContact,
  IUser,
  IMail,
  subscriptionType,
  callbackFunction,
  updateBodyStrings,
  authType,
  patterns,
  IAvatar,
  getHtmlMailContent,
  mailService,
  prepareMail,
};
