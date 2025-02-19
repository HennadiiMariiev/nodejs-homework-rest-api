import { Request, Response, NextFunction } from "express";
import {
  IContact,
  isErrorOrNull,
  responseWithError,
  updateBodyStrings,
} from "../helpers";
import { contactService } from "../services";

const getContacts = async (req: Request, res: Response) => {
  const { owner } = req.body as { owner: string };

  const contacts = await contactService.getAll(owner, req);

  res.status(200).json({ message: "success", data: { contacts } });
};

const getContactById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { owner } = req.body as { owner: string };
    const { contactId } = req.params as { contactId: string };

    const contact: IContact | Error = await contactService.getById(
      owner,
      contactId
    );

    if (isErrorOrNull(contact)) {
      return responseWithError(contact, next);
    }

    res.status(200).json({ message: "success", data: { contact } });
  } catch (error) {
    next(error);
  }
};

const postContact = async (req: Request, res: Response, next: NextFunction) => {
  const сontact: IContact | Error = await contactService.post(req.body);

  if (isErrorOrNull(сontact)) {
    return responseWithError(сontact, next);
  }

  res.status(201).json({ message: "Contact added", data: { сontact } });
};

const updateContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { owner } = req.body as { owner: string };
  const { contactId } = req.params as { contactId: string };

  const сontact: IContact | Error = await contactService.update(
    owner,
    contactId,
    {
      ...req.body,
    }
  );

  if (isErrorOrNull(сontact)) {
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
  const { contactId } = req.params as { contactId: string };

  const сontact: IContact | Error = await contactService.updateStatus(
    owner,
    contactId,
    favorite
  );

  if (isErrorOrNull(сontact)) {
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
  const { owner } = req.body as { owner: string };
  const { contactId } = req.params as { contactId: string };

  const contact: IContact | Error = await contactService.deleteById(
    owner,
    contactId
  );

  if (isErrorOrNull(contact)) {
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
