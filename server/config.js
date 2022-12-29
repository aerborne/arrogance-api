import * as dotenv from "dotenv";
dotenv.config();

const config = {
  PORT: `${process.env.PORT}`,
  RESET_DATABASE: `${process.env.RESET_DATABASE}`.toLowerCase() === "true",
  DATABASE_CONNECTION: process.env.DATABASE_CONNECTION,
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT,
  DATABASE_USERNAME: process.env.DATABASE_USERNAME,
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
  DATABASE_NAME: process.env.DATABASE_NAME,
  SECRET_KEY: process.env.SECRET_KEY,
};

export default config;
