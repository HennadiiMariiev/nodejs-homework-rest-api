import { Request, Response, NextFunction } from "express";
import { BadRequest, Unauthorized, NotFound, Forbidden } from "http-errors";
import jwt from "jsonwebtoken";
import { subscriptionType, authType, IUser } from "../helpers";
import { User } from "../model";
import { SECRET_KEY } from "../config";

const checkSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const subscriptions = ["starter", "pro", "business"] as const;

  function isOfTypeSubscription(
    userSubscription: string
  ): userSubscription is subscriptionType {
    return (subscriptions as readonly string[]).includes(userSubscription);
  }

  const { subscription }: { subscription: subscriptionType } = req.body;

  if (!isOfTypeSubscription(subscription)) {
    next(new BadRequest("Wrong subscription type"));
  }

  next();
};

const checkUserCredentials = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    next(new NotFound(`User with email "${email}" not found`));
  }

  if (!user?.comparePassword(password)) {
    next(new Unauthorized(`Email or password is wrong`));
  }

  if (!user?.verified) {
    next(new Forbidden(`User is not verified`));
  }

  next();
};

const authenticateUser = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers as { authorization: string };
    const [bearer, token]: authType = authorization.split(" ") as authType;

    if (bearer !== "Bearer") {
      next(new Unauthorized("Not authorized"));
    }

    const id = jwt.verify(token, SECRET_KEY);

    const user: IUser = await User.findById(id);

    if (!user || !user.token) {
      next(new Unauthorized("Not authorized"));
    }

    if (req.originalUrl.includes("/api/contacts")) {
      req.body.owner = user._id;
    }

    if (req.originalUrl.includes("/api/users")) {
      req.body.user = user;
    }
  } catch (error) {
    next(new Unauthorized(`Not authorized: ${error}`));
  }

  next();
};

export { checkSubscription, authenticateUser, checkUserCredentials };
