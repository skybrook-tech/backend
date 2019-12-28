import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import passport from "passport";
import * as Sequelize from "express";
import passportJWT from "passport-jwt";
import db from "../db/models";

interface JwtPayload {
  id: number;
}

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const jwtAlgorithm = process.env.ALGORITHIM;
const jwtExpiresIn = "6h";

const jwtOptions = {
  jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
  algorithms: [jwtAlgorithm],
  jwtExpiresIn,
  passReqToCallback: true
};

passport.use(
  new passportJWT.Strategy(
    jwtOptions,
    async (req: any, jwtPayload: JwtPayload, next: Sequelize.NextFunction) => {
      try {
        const user = await db.Users.findOne({ where: { id: jwtPayload.id } });

        if (user) {
          req.locals.currentUser = user;

          next(null);
        } else {
          req.locals.currentUser = null;
          next("foo");
        }
      } catch (error) {
        next(error);
      }
    }
  )
);

// @ts-ignore
passport.use(db.Users.createStrategy());
// @ts-ignore
passport.serializeUser(db.Users.serializeUser());
// @ts-ignore
passport.deserializeUser(db.Users.deserializeUser());

const signJwtForUser = (
  req: Sequelize.Request,
  res: Sequelize.Response,
  next: Sequelize.NextFunction
) => {
  const token = jwt.sign(
    {
      email: res.locals.currentUser.email,
      firstName: res.locals.currentUser.first_name,
      lastName: res.locals.currentUser.last_name,
      id: res.locals.currentUser.id
    },
    jwtSecret,
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn
    }
  );

  res.locals.response = { token };

  next();
};

const register = async (
  req: Sequelize.Request,
  res: Sequelize.Response,
  next: Sequelize.NextFunction
) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, bcrypt.genSaltSync(8));

    const newUser = await db.Users.create({ ...req.body, password: hashedPassword });

    res.locals.currentUser = newUser;

    next();
  } catch (error) {
    return next(error);
  }
};

const authenticationMiddlewares = {
  register,
  initializePassport: passport.initialize(),
  signJwtForUser
};

export default authenticationMiddlewares;
