import express, { Request, Response, Application, NextFunction } from "express";
import logger from "morgan";
import cors from "cors";
import { IError } from "./helpers";

import { router as contactsRouter } from "./routes/api";

const app: Application = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err: IError, _: Request, res: Response, __: NextFunction) => {
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).json({ message });
});

export = app;
