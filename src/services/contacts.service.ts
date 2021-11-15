import { Request } from "express";
import { Contact } from "../model";
import { IContact } from "../helpers";

import {
  isFavoriteInRequest,
  isValidPaginationInRequest,
  getPageAndLimitFromRequest,
  isValidId,
  isDuplicateKeyError,
} from "../helpers";
import { BadRequest } from "http-errors";

const getAll = async (owner: string, req: Request) => {
  try {
    if (isFavoriteInRequest(req)) {
      const { favorite } = req.query;

      return await Contact.find({
        owner,
        favorite,
      }).populate("owner", "email");
    }

    if (isValidPaginationInRequest(req)) {
      const { page, limit } = getPageAndLimitFromRequest(req);

      return await Contact.find({ owner }, "_id name email phone owner", {
        skip: (page - 1) * limit,
        limit,
      }).populate("owner", "email");
    }

    return await Contact.find({ owner }).populate("owner", "email");
  } catch (error) {
    return error;
  }
};

const getById = async (owner: string, _id: string) => {
  try {
    if (!isValidId(_id)) {
      return new BadRequest("Requested Id is not valid");
    }

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
    if (isDuplicateKeyError(error)) {
      return new BadRequest("Contact with same email or phone already exists.");
    }

    return error;
  }
};

const update = async (owner: string, _id: string, contact: IContact) => {
  try {
    if (!isValidId(_id)) {
      return new BadRequest("Requested Id is not valid");
    }

    const newContact = await Contact.findOneAndUpdate(
      { owner, _id },
      {
        $set: contact,
      },
      { new: true }
    );

    return newContact.populate("owner", "email");
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return new BadRequest("Contact with same email or phone already exists.");
    }

    return error;
  }
};

const updateStatus = async (owner: string, _id: string, favorite: boolean) => {
  try {
    if (!isValidId(_id)) {
      return new BadRequest("Requested Id is not valid");
    }

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
    if (!isValidId(_id)) {
      return new BadRequest("Requested Id is not valid");
    }

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
