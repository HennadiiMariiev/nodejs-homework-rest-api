import dotenv from "dotenv";
dotenv.config();

export const { PORT = 3000 } = process.env;
export const { DB_URL } = process.env as { DB_URL: string };
export const { DB_NAME } = process.env as { DB_NAME: string };
export const { SECRET_KEY } = process.env as { SECRET_KEY: string };
export const SALT_COUNT = 10;
