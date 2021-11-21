import multer from "multer";
import Jimp from "jimp";
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

const uploadMiddleware = multer({
  storage: uploadConfig,
  limits: {
    files: 1,
    fileSize: MAX_AVATAR_SIZE,
  },
  fileFilter: (_, file, cb) => {
    if (!Jimp_TYPES.includes(file.mimetype)) {
      cb({ message: "Bad mimetype", status: 400 } as unknown as Error);
    }

    cb(null, true);
  },
});

export { uploadMiddleware };
