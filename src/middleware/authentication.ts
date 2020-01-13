import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import db from "../db/models";
import errors from "../errors";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET;
const jwtAlgorithm = process.env.ALGORITHIM;
const jwtExpiresIn = "6h";

const signJwtForUser = (req: Request, res: Response, next: NextFunction) => {
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

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, bcrypt.genSaltSync(8));

    const newUser = await db.Users.create({ ...req.body, password: hashedPassword });

    res.locals.currentUser = newUser;

    next();
  } catch (error) {
    return next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
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

const authenticationMiddlewares = {
  register,
  signJwtForUser,
  login
};

export default authenticationMiddlewares;
