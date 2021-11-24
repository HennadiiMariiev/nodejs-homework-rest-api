import dotenv from "dotenv";
import path from "path";
dotenv.config();

export const { PORT = 3000 } = process.env;
export const { DB_NAME, DB_URL, SECRET_KEY } = process.env as {
  DB_NAME: string;
  SECRET_KEY: string;
  DB_URL: string;
};
export const SALT_COUNT = 10;

export const TEMP_FOLDER_PATH = path.join(__dirname, "../../", "temp");
export const AVATARS_FOLDER_PATH = path.join(
  __dirname,
  "../../",
  "public/avatars"
);

export const MAX_AVATAR_SIZE = 4_096_000;
export const AVATAR_PX_SIZE = 250;

export const { SENDGRID_API_KEY } = process.env;
