import jwt from "jsonwebtoken";
import { BadRequest, NotFound } from "http-errors";
import gravatar from "gravatar";
import fs from "fs/promises";
import Jimp from "jimp";
import { v4 } from "uuid";
import { User } from "../model";
import { IUser, isDuplicateKeyError } from "../helpers";
import {
  SECRET_KEY,
  TEMP_FOLDER_PATH,
  AVATARS_FOLDER_PATH,
  AVATAR_PX_SIZE,
} from "../config";
import { IAvatar } from "../helpers/interfaces";
import { getHtmlMailContent, prepareMail, mailService } from "../helpers";

const signup = async (user: IUser) => {
  try {
    const { email, password } = user;
    const avatarURL = gravatar.url(email, { s: "250", r: "g" }, true);
    const verificationToken = v4();

    const newUser = new User({ email, avatarURL, verificationToken });
    newUser.setPassword(password);

    await newUser.save();

    const html = getHtmlMailContent(verificationToken);
    const mail = prepareMail(email, html);

    const mailResponse = await mailService.send(mail);

    if (mailResponse[0]?.statusCode === 202) {
      console.log(`Message to ${email} was successfully sent!`);
    }

    return newUser;
  } catch (error) {
    return isDuplicateKeyError(error)
      ? new BadRequest("User with same email already exists.")
      : error;
  }
};

const login = async (user: IUser) => {
  try {
    const searchedUser = await User.findOne({ email: user.email });

    const token = jwt.sign({ _id: searchedUser._id }, SECRET_KEY, {
      expiresIn: "1h",
    });

    await User.findByIdAndUpdate(searchedUser._id, { token });

    return { searchedUser, token };
  } catch (error) {
    return error;
  }
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
  const { _id } = user;
  const { path, originalname } = file;

  try {
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

    return updatedUser;
  } catch (error) {
    return error;
  } finally {
    await fs.unlink(`${TEMP_FOLDER_PATH}/${originalname}`);
  }
};

const verify = async (verificationToken: string) => {
  try {
    const searchedUser = await User.findOneAndUpdate(
      { verificationToken },
      {
        verificationToken: null,
        verified: true,
      },
      { new: true }
    );

    if (!searchedUser) {
      return new NotFound("User not found");
    }

    return searchedUser;
  } catch (error) {
    return error;
  }
};

const reVerify = async (email: string) => {
  try {
    const searchedUser = await User.findOne({ email });

    if (!searchedUser) {
      return new NotFound("User not found");
    }

    if (searchedUser?.verified) {
      return new BadRequest("Verification has already been passed");
    }

    const { verificationToken } = searchedUser as IUser;

    const html = getHtmlMailContent(verificationToken as string);
    const mail = prepareMail(email, html);

    const mailResponse = await mailService.send(mail);

    if (mailResponse[0]?.statusCode === 202) {
      console.log(`Message to ${email} was successfully sent!`);
    }

    return searchedUser;
  } catch (error) {
    return error;
  }
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
