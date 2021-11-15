import { Request, Response, NextFunction } from "express";
import { IContact } from "../helpers";
import { contactService } from "../services";
import { hasError, responseWithError } from "../helpers";
import { updateBodyStrings } from "../helpers";

const getContacts = async (req: Request, res: Response) => {
  const ownerId: string = req.body.owner;

  const contacts = await contactService.getAll(ownerId, req);

  res.status(200).json({ message: "success", data: { contacts } });
};

const getContactById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ownerId: string = req.body.owner;
    const contactId: string = req.params.contactId;

    const contact: IContact | Error = await contactService.getById(
      ownerId,
      contactId
    );

    if (hasError(contact)) {
      return responseWithError(contact, next);
    }

    res.status(200).json({ message: "success", data: { contact } });
  } catch (error) {
    next(error);
  }
};

const postContact = async (req: Request, res: Response, next: NextFunction) => {
  const сontact: IContact | Error = await contactService.post(req.body);

  if (hasError(сontact)) {
    return responseWithError(сontact, next);
  }

  res.status(201).json({ message: "Contact added", data: { сontact } });
};

const updateContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const owner: string = req.body.owner;
  const contactId: string = req.params.contactId;

  const сontact: IContact | Error = await contactService.update(
    owner,
    contactId,
    {
      ...req.body,
    }
  );

  if (hasError(сontact)) {
    return responseWithError(сontact, next);
  }

  res.status(200).json({ message: "Contact updated", data: { сontact } });
};

const updateStatusContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { owner, favorite }: updateBodyStrings = req.body;
  const contactId: string = req.params.contactId;

  const сontact: IContact | Error = await contactService.updateStatus(
    owner,
    contactId,
    favorite
  );

  if (hasError(сontact)) {
    return responseWithError(сontact, next);
  }

  res
    .status(200)
    .json({ message: `Contact's status updated`, data: { сontact } });
};

const deleteContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const owner: string = req.body.owner;
  const contactId: string = req.params.contactId;

  const contact: IContact | Error = await contactService.deleteById(
    owner,
    contactId
  );

  if (hasError(contact)) {
    return responseWithError(contact, next);
  }

  res.status(200).json({ message: "Contact deleted", data: { contact } });
};

export {
  getContacts,
  getContactById,
  postContact,
  updateContact,
  updateStatusContact,
  deleteContact,
};
