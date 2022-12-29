import express from "express";
import crypto from "crypto";
import { modelManager } from "../app";
import config from "../config";

const router = express.Router();
/* GET users listing. */
router.get("/", async function (req, res, next) {
  const database = await modelManager;
  const { User, UserAuth, Role } = database.models;
  const users = await User.findAll({
    include: [
      { model: UserAuth, as: "auths" },
      {
        model: Role,
      },
    ],
  });
  res.send(users);
});

router.post("/", async function (req, res, next) {
  const database = await modelManager;
  const { User, UserAuth } = database.models;
  const { userName, disabled, email, firstName, lastName, roleId, password } =
    req.body;
  console.log({ userName, disabled, email, firstName, lastName, roleId });
  const user = await User.create({
    userName,
    disabled,
    email,
    firstName,
    lastName,
    roleId,
  });
  const hashPassword = crypto
    .createHmac("sha256", config.SECRET_KEY)
    .update(password)
    .digest("hex");

  const userAuth = await UserAuth.create({
    name: "password",
    type: "password",
    token: hashPassword,
    userId: user.id,
  });

  console.log({ user, userAuth });

  res.send(user);
});

export default router;
