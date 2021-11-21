import { Schema } from "mongoose";
export interface IContact {
  readonly _id: string;
  name: string;
  phone: string;
  email: string;
  owner: Schema.Types.ObjectId;
  favorite: boolean;
}

export interface IUser {
  readonly _id: string;
  email: string;
  password: string;
  subscription: string;
  token: string;
  avatarURL: string;
}

export interface IError {
  status: number;
  message: string;
}

export interface IAvatar {
  avatarURL: string;
}
