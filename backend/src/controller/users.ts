import bcrypt from "bcryptjs";
import { UserType, UserLoginType } from "./../models/user";
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
    return res.status(200).send({ message: "User registered OK" });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  const { email, password }: { email: string; password: string } = req.body;
  try {
    const user: UserLoginType | null = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message:
          "User email address doesnt match, invalid credential or not registered",
      }); // only for dev purpose , will change messages later
    }
    const isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" }); // only for dev purpose , will change messages later
    }
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
    res.status(200).json({ userId: user._id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
