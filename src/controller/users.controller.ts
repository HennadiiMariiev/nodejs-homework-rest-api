import { NextFunction, Request, Response } from "express";
import {
  IUser,
  subscriptionType,
  isErrorOrNull,
  responseWithError,
} from "../helpers";
import { userService } from "../services";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const user: IUser | Error = await userService.signup(req.body);

  if (isErrorOrNull(user)) {
    return responseWithError(user, next);
  }

  const { email } = user as IUser;

  res.status(200).json({ message: "success", data: { email } });
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { searchedUser: user, token } = (await userService.login(req.body)) as {
    searchedUser: IUser;
    token: string;
  };

  if (isErrorOrNull(user)) {
    return responseWithError(user, next);
  }

  const { email, subscription } = user;

  res.status(200).json({
    message: "success",
    data: { user: { email, subscription }, token },
  });
};

const logout = async (req: Request, res: Response) => {
  await userService.logout(req.body.user);

  res.status(204).json();
};

const current = async (req: Request, res: Response, next: NextFunction) => {
  const user = await userService.current(req.body.user);

  if (isErrorOrNull(user)) {
    return responseWithError(user, next);
  }

  const { email, subscription } = user;

  res.status(200).json({
    message: "success",
    data: { user: { email, subscription } },
  });
};

const subscribe = async (req: Request, res: Response, next: NextFunction) => {
  const {
    user,
    subscription: subscriptionStr,
  }: { user: IUser; subscription: subscriptionType } = req.body;

  const searchedUser = await userService.subscribe(user, subscriptionStr);

  if (isErrorOrNull(searchedUser)) {
    return responseWithError(searchedUser, next);
  }

  const { email, subscription } = searchedUser;

  res.status(200).json({
    message: "User subscription updated",
    data: { user: { email, subscription } },
  });
};

const changeAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { user }: { user: IUser } = req.body;
  const file = req.file as Express.Multer.File;

  const updatedUser: IUser | Error = await userService.changeAvatar(user, file);

  if (isErrorOrNull(updatedUser)) {
    return responseWithError(updatedUser, next);
  }

  const { avatarURL } = updatedUser as IUser;

  res.status(200).json({
    message: "User avatar updated",
    data: { avatarURL },
  });
};

const verify = async (req: Request, res: Response, next: NextFunction) => {
  const { verificationToken } = req.params as { verificationToken: string };

  const user: IUser | Error = await userService.verify(verificationToken);

  if (isErrorOrNull(user)) {
    return responseWithError(user, next);
  }

  res.status(200).json({
    message: "Verification successful",
  });
};

const reVerify = async (req: Request, res: Response, next: NextFunction) => {
  const { email }: { email: string } = req.body;

  const user: IUser | Error = await userService.reVerify(email);

  if (isErrorOrNull(user)) {
    return responseWithError(user, next);
  }

  res.status(200).json({
    message: "Verification email sent",
  });
};

export {
  signup,
  login,
  logout,
  current,
  subscribe,
  changeAvatar,
  verify,
  reVerify,
};
