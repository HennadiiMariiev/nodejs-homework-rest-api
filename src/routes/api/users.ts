import express from "express";
import {
  signup,
  login,
  logout,
  current,
  subscribe,
  changeAvatar,
} from "./../../controller";
import { asyncWrapper } from "../../helpers";
import {
  userValidation,
  checkUserCredentials,
  authenticateUser,
  checkSubscription,
  fileSizeMiddleWare,
} from "./../../middlewares";

const router = express.Router();

router.post("/signup", asyncWrapper([userValidation]), asyncWrapper([signup]));

router.post(
  "/login",
  asyncWrapper([userValidation, checkUserCredentials]),
  asyncWrapper([login])
);

router.post(
  "/logout",
  asyncWrapper([authenticateUser]),
  asyncWrapper([logout])
);

router.get(
  "/current",
  asyncWrapper([authenticateUser]),
  asyncWrapper([current])
);

router.patch(
  "/",
  asyncWrapper([authenticateUser, checkSubscription]),
  asyncWrapper([subscribe])
);

router.patch(
  "/avatars",
  asyncWrapper([authenticateUser]),
  fileSizeMiddleWare,
  asyncWrapper([changeAvatar])
);

export { router };
