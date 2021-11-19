import dotenv from "dotenv";
dotenv.config();

export const { PORT = 3000 } = process.env;
export const { DB_NAME, DB_URL, SECRET_KEY } = process.env as {
  DB_NAME: string;
  SECRET_KEY: string;
  DB_URL: string;
};
export const SALT_COUNT = 10;
