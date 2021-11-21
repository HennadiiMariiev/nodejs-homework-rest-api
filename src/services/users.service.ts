import jwt from "jsonwebtoken";
import { BadRequest } from "http-errors";
import gravatar from "gravatar";
import fs from "fs/promises";
import Jimp from "jimp";
import { User } from "../model";
import { IUser, isDuplicateKeyError } from "../helpers";
import {
  SECRET_KEY,
  TEMP_FOLDER_PATH,
  AVATARS_FOLDER_PATH,
  AVATAR_PX_SIZE,
} from "../config";
import { IAvatar } from "../helpers/interfaces";

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

const changeAvatar = async (user: IUser, file: Express.Multer.File) => {
  try {
    const { _id } = user;
    const { path, originalname } = file;
    const avatarName = `${_id}_${originalname}`;

    const image = await Jimp.read(path);
    image
      .resize(AVATAR_PX_SIZE, AVATAR_PX_SIZE)
      .write(`${AVATARS_FOLDER_PATH}/${avatarName}`);

    const avatarObj: IAvatar = {
      avatarURL: `/avatars/${avatarName}`,
    };

    const updatedUser = await User.findByIdAndUpdate(_id, avatarObj, {
      new: true,
    });

    await fs.unlink(`${TEMP_FOLDER_PATH}/${originalname}`);

    return updatedUser;
  } catch (error) {
    return error;
  }
};

export { signup, login, logout, current, subscribe, changeAvatar };
