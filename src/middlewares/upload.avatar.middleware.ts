import multer from "multer";
import Jimp from "jimp";
import fs from "fs";
import path from "path";
import { Request, Response, NextFunction } from "express";
import { BadRequest } from "http-errors";
import { MAX_AVATAR_SIZE, TEMP_FOLDER_PATH } from "../config";

const Jimp_TYPES = [
  Jimp.MIME_PNG,
  Jimp.MIME_GIF,
  Jimp.MIME_JPEG,
  Jimp.MIME_BMP,
  Jimp.MIME_TIFF,
  Jimp.MIME_X_MS_BMP,
] as string[];

const uploadConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, TEMP_FOLDER_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const clearTempFolder = async (folder: string): Promise<void> => {
  await fs.readdir(folder, async (err, files) => {
    if (err) throw err;

    for (const file of files) {
      await fs.unlink(path.join(folder, file), (err) => {
        if (err) throw err;
      });
    }
  });
};

const uploadMiddleware = multer({
  storage: uploadConfig,
  limits: {
    files: 1,
    fileSize: MAX_AVATAR_SIZE,
  },
  fileFilter: (_, file, cb) => {
    if (!Jimp_TYPES.includes(file.mimetype)) {
      // add this function, because if wrong file was sent,
      // it would be saved in temp folder anyway...
      // So, temp folder may become a garbage keeper)))
      clearTempFolder(TEMP_FOLDER_PATH);

      cb({ message: "Bad mimetype", status: 400 } as unknown as Error);
    }

    cb(null, true);
  },
});

const checkFilePresence = (req: Request, _: Response, next: NextFunction) => {
  if (req.file === undefined) {
    next(new BadRequest("No file attached"));
  }

  next();
};

export { uploadMiddleware, checkFilePresence };
