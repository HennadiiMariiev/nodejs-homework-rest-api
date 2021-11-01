import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DB_URL = process.env.DB_URL!;
export const DB_NAME = process.env.DB_NAME;
