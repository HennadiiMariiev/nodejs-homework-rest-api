import jwt from "jsonwebtoken";
import { BadRequest } from "http-errors";
import { User } from "../model";
import { IUser } from "../helpers";
import { SECRET_KEY } from "../config";
import { isDuplicateKeyError } from "../helpers";

const signup = async (user: IUser) => {
  try {
    const { email, password } = user;

    const newUser = new User({ email });
    newUser.setPassword(password);

    await newUser.save();

    return newUser;
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return new BadRequest("User with same email already exists.");
    }

    return error;
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

export { signup, login, logout, current, subscribe };
