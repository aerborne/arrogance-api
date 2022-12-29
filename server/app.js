import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import passport from "passport";

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import createDatabaseInstance from "./sequelize-adapter";
import strategy from "./strategy/index";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

export const modelManager = (async () => {
  return createDatabaseInstance();
})();

passport.use(strategy);

// initialize routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

export default app;
