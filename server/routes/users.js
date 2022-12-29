import express from "express";
import crypto from "crypto";
import { modelManager } from "../app";
import config from "../config";
import jwt from "jsonwebtoken";
import passport from "passport";

const router = express.Router();
/* GET users listing. */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async function (req, res, next) {
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
  }
);

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

router.post("/login", async function (req, res, next) {
  const { userName, password } = req.body;
  if (!userName || !password) {
    res.send("Invalid Credentials").status(400);
  }
  const database = await modelManager;
  const { User, UserAuth } = database.models;
  const hashPassword = crypto
    .createHmac("sha256", config.SECRET_KEY)
    .update(password)
    .digest("hex");

  let user = await User.findOne({
    where: {
      userName,
    },

    include: [
      {
        model: UserAuth,
        as: "auths",
        where: {
          type: "password",
          token: hashPassword,
        },
      },
    ],
  });

  if (!user) {
    res.send("Invalid Credentials").status(400);
  }

  user = user.toJSON();
  user.auths = undefined;
  user.token = jwt.sign(user, config.SECRET_KEY, {
    expiresIn: "24h",
  });
  res.send(user);
});

export default router;
