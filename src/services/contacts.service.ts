import { Request } from "express";
import { BadRequest } from "http-errors";
import { Contact } from "../model";
import { IContact } from "../helpers";

import {
  isFavoriteInRequest,
  isValidPaginationInRequest,
  getPageAndLimitFromRequest,
  isDuplicateKeyError,
} from "../helpers";

const getAll = async (owner: string, req: Request) => {
  try {
    const searchOptions: {
      owner: string;
      favorite?: string;
    } = { owner };

    const paginationOptions: {
      skip?: number;
      limit?: number;
    } = {};

    if (isFavoriteInRequest(req)) {
      const { favorite } = req.query;

      searchOptions.favorite = favorite as string;
    }

    if (isValidPaginationInRequest(req)) {
      const { page, limit } = getPageAndLimitFromRequest(req);

      paginationOptions.skip = (page - 1) * limit;
      paginationOptions.limit = limit;
    }

    return await Contact.find(
      searchOptions,
      "_id name email phone favorite owner",
      paginationOptions
    ).populate("owner", "email");
  } catch (error) {
    return error;
  }
};

const getById = async (owner: string, _id: string) => {
  try {
    return await Contact.findById({ owner, _id }).populate("owner", "email");
  } catch (error) {
    return error;
  }
};

const post = async (contact: IContact) => {
  try {
    const newContact = await new Contact(contact);

    await newContact.save();

    return newContact.populate("owner", "email");
  } catch (error) {
    return isDuplicateKeyError(error)
      ? new BadRequest("Contact with same email or phone already exists.")
      : error;
  }
};

const update = async (owner: string, _id: string, contact: IContact) => {
  try {
    const newContact = await Contact.findOneAndUpdate(
      { owner, _id },
      {
        $set: contact,
      },
      { new: true }
    );

    return newContact.populate("owner", "email");
  } catch (error) {
    return isDuplicateKeyError(error)
      ? new BadRequest("Contact with same email or phone already exists.")
      : error;
  }
};

const updateStatus = async (owner: string, _id: string, favorite: boolean) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { owner, _id },
      { favorite },
      { new: true }
    );

    return updatedContact.populate("owner", "email");
  } catch (error) {
    return error;
  }
};

const deleteById = async (owner: string, _id: string) => {
  try {
    const contact = await Contact.findOneAndRemove({
      owner,
      _id,
    });

    return contact;
  } catch (error) {
    return error;
  }
};

export { getAll, getById, post, update, updateStatus, deleteById };
