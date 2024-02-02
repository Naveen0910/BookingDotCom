import { UserType } from "./../models/user";
import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

export const userRegistration = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = new User(req.body);
    await user.save();

    //token
    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("JWT secret is not defined");
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.cookie("authCookie", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });
    return res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};
