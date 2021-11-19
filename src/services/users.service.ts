import jwt from "jsonwebtoken";
import { BadRequest } from "http-errors";
import gravatar from "gravatar";
import { User } from "../model";
import { IUser, isDuplicateKeyError } from "../helpers";
import { SECRET_KEY } from "../config";

const signup = async (user: IUser) => {
  try {
    const { email, password } = user;
    const avatarURL = gravatar.url(email);

    const newUser = new User({ email, avatarURL });
    newUser.setPassword(password);

    await newUser.save();

    return newUser;
  } catch (error) {
    return isDuplicateKeyError(error)
      ? new BadRequest("User with same email already exists.")
      : error;
  }
};

const login = async (user: IUser) => {
  const searchedUser: IUser = await User.findOne({ email: user.email });
  const token = jwt.sign({ _id: searchedUser._id }, SECRET_KEY, {
    expiresIn: "1h",
  });

  await User.findByIdAndUpdate(searchedUser._id, { token });

  return { searchedUser, token };
};

const logout = async (user: IUser) => {
  await User.findByIdAndUpdate(user._id, {
    token: null,
  });
};

const current = async (user: IUser) => {
  const searchedUser: IUser = await User.findById(user._id);
  return searchedUser;
};

const subscribe = async (user: IUser, subscription: string) => {
  const updatedUser: IUser = await User.findByIdAndUpdate(
    user._id,
    {
      subscription,
    },
    { new: true }
  );

  return updatedUser;
};

//TODO: logic for avatar change
const changeAvatar = async (user: IUser, subscription: string) => {
  const updatedUser: IUser = await User.findByIdAndUpdate(
    user._id,
    {
      subscription,
    },
    { new: true }
  );

  return updatedUser;
};

export { signup, login, logout, current, subscribe, changeAvatar };
