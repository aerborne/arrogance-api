import passport from "passport";
import config from "../config";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { modelManager } from "../app";

const authStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
    secretOrKey: config.SECRET_KEY,
    authScheme: "Bearer",
  },
  strategyCallback
);

async function strategyCallback(jwtPayload, next) {
  console.log({ jwtPayload });
  const database = await modelManager;
  const { User } = database.models;
  const user = await User.findByPK(jwtPayload.id);
  if (!user) {
    next(null, false);
  }
  next(null, user);

  // db.query(
  //   "SELECT * FROM users WHERE id = ?",
  //   jwtPayload.id,
  //   function (err, results, fields) {
  //     if (err) {
  //       console.log(
  //         `DB ERROR [${err.code}]: ${err.sqlMessage}!\nSQL Query: ${err.sql}`
  //       );
  //       next(err, false);
  //     }
  //     if (results.length) {
  //       var user = results[0];
  //       delete user["password"];
  //       next(null, user);
  //     } else {
  //       next(null, false);
  //     }
  //   }
  // );
}

export default authStrategy;
