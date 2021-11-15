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
} from "../../middlewares";
import { asyncWrapper } from "../../helpers";

const router = express.Router();

router.get("/", asyncWrapper([authenticateUser]), asyncWrapper([getContacts]));

router.get(
  "/:contactId",
  asyncWrapper([authenticateUser]),
  asyncWrapper([getContactById])
);

router.delete(
  "/:contactId",
  asyncWrapper([authenticateUser]),
  asyncWrapper([deleteContact])
);

router.post(
  "/",
  asyncWrapper([authenticateUser, addContactValidation]),
  asyncWrapper([postContact])
);

router.put(
  "/:contactId",
  asyncWrapper([authenticateUser, updateContactValidation]),
  asyncWrapper([updateContact])
);

router.patch(
  "/:contactId/favorite",
  asyncWrapper([authenticateUser, updateStatusContactValidation]),
  asyncWrapper([updateStatusContact])
);

export { router };
