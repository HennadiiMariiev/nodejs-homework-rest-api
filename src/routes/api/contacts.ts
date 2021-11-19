import express from "express";
import {
  getContacts,
  getContactById,
  deleteContact,
  postContact,
  updateContact,
  updateStatusContact,
} from "../../controller";
import {
  addContactValidation,
  updateContactValidation,
  updateStatusContactValidation,
  authenticateUser,
  contactIdValidation,
} from "../../middlewares";
import { asyncWrapper } from "../../helpers";

const router = express.Router();

router.get("/", asyncWrapper([authenticateUser]), asyncWrapper([getContacts]));

router.get(
  "/:contactId",
  asyncWrapper([authenticateUser, contactIdValidation]),
  asyncWrapper([getContactById])
);

router.delete(
  "/:contactId",
  asyncWrapper([authenticateUser, contactIdValidation]),
  asyncWrapper([deleteContact])
);

router.post(
  "/",
  asyncWrapper([authenticateUser, addContactValidation]),
  asyncWrapper([postContact])
);

router.put(
  "/:contactId",
  asyncWrapper([
    authenticateUser,
    contactIdValidation,
    updateContactValidation,
  ]),
  asyncWrapper([updateContact])
);

router.patch(
  "/:contactId/favorite",
  asyncWrapper([
    authenticateUser,
    contactIdValidation,
    updateStatusContactValidation,
  ]),
  asyncWrapper([updateStatusContact])
);

export { router };
