import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import passport from "passport";
import * as Sequelize from "express";
import passportJWT from "passport-jwt";
import db from "../db/models";
import errors from "../errors";

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
  new passportJWT.Strategy(jwtOptions, async (req: any, jwtPayload: JwtPayload, next: any) => {
    try {
      const user = await db.Users.findOne({ where: { id: jwtPayload.id } });

      if (user) {
        next(null, user);
      }
    } catch (error) {
      next(error);
    }
  })
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

const login = async (
  req: Sequelize.Request,
  res: Sequelize.Response,
  next: Sequelize.NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await db.Users.findOne({ where: { email } });

    const passwordMatchs = await bcrypt.compare(password, user.password);

    if (passwordMatchs) {
      res.locals.currentUser = user;

      next();
    }

    if (!passwordMatchs) {
      return next(errors.authentication.AUTH_USER_WRONG_PW);
    }
  } catch (error) {
    next(error);
  }
};

const jwtErrorSwitch = (message: string) => {
  switch (message) {
    case "No auth token":
      return errors.authentication.AUTH_NO_TOKEN;

    case "invalid token":
      return errors.authentication.AUTH_INVALID_TOKEN;

    default:
      return { message, status: 401, code: "N/A" };
  }
};

const requireJwt = (
  req: Sequelize.Request,
  res: Sequelize.Response,
  next: Sequelize.NextFunction
) => {
  if (req.headers["internal-auth"] === process.env.INTERNAL_SERVICE_AUTH) {
    return next();
  }

  passport.authenticate("jwt", { session: false }, (err, user, failuresOrInfo) => {
    if (failuresOrInfo) {
      const message = failuresOrInfo.message;
      const error = jwtErrorSwitch(message);

      return next(error);
    }

    if (!user) {
      res.locals.currentUser = null;
      return next(errors.authentication.AUTH_USER_NOT_FOUND);
    }

    if (user) {
      res.locals.currentUser = user;
      return next();
    }
  })(req, res, next);
};

const authenticationMiddlewares = {
  register,
  initializePassport: passport.initialize(),
  signJwtForUser,
  login,
  requireJwt
};

export default authenticationMiddlewares;
