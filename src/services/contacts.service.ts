import { Request } from "express";
import { Contact } from "../model";
import { IContact } from "../helpers";

import {
  isFavoriteInRequest,
  isValidPaginationInRequest,
  getPageAndLimitFromRequest,
} from "../helpers";

const getAll = async (owner: string, req: Request) => {
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
};

const getById = async (owner: string, _id: string) =>
  await Contact.findById({ owner, _id }).populate("owner", "email");

const post = async (contact: IContact) => {
  const newContact = await new Contact(contact);

  await newContact.save();

  return newContact;
};

const update = async (owner: string, _id: string, contact: IContact) => {
  const newContact = await Contact.findOneAndUpdate(
    { owner, _id },
    {
      $set: contact,
    },
    { new: true }
  );

  return newContact;
};

const updateStatus = async (owner: string, _id: string, favorite: boolean) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { owner, _id },
    { favorite },
    { new: true }
  );

  return updatedContact;
};

const deleteById = async (owner: string, _id: string) => {
  const contact = await Contact.findOneAndRemove({
    owner,
    _id,
  });

  return contact;
};

export { getAll, getById, post, update, updateStatus, deleteById };
