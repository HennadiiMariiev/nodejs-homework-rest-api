import multer from "multer";
import { TEMP_FOLDER_PATH } from "../config/config";

const uploadConfig = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, TEMP_FOLDER_PATH);
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadMiddleware = multer({
  storage: uploadConfig,
});

export { uploadMiddleware };
