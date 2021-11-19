import express, { Request, Response, Application, NextFunction } from "express";
import logger from "morgan";
import cors from "cors";
import multer from "multer";
import { IError } from "./helpers";
import { TEMP_FOLDER_PATH, AVATARS_FOLDER_PATH } from "./config/config";

import { contactRouter, userRouter } from "./routes/api";

const app: Application = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

const uploadConfig = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, TEMP_FOLDER_PATH);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/avatars", express.static(AVATARS_FOLDER_PATH));
app.use("/api/contacts", contactRouter);
app.use("/api/users", userRouter);

app.use((_, res: Response) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err: IError, _: Request, res: Response, next: NextFunction) => {
  const { status: code = 500, message = "Internal server error" } = err;
  res.status(code).json({ message, status: "error", code });
});

export = app;
