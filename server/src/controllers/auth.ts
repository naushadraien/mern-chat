import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { UserSignUpType } from "../types/types.js";
import User from "../models/user.js";
import { errorMessage, successData } from "../utils/utility-func.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = TryCatch(
  async (req: Request<{}, {}, UserSignUpType>, res, next) => {
    const { fullName, email, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return errorMessage(next, "password does not match", 400);
    }
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return errorMessage(next, "User already exists", 400);
    }

    const boyImage = `https://avatar.iran.liara.run/public/boy?username=${fullName}`;
    const girlImage = `https://avatar.iran.liara.run/public/girl?username=${fullName}`;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      gender,
      imgUrl: gender === "male" ? boyImage : girlImage,
    });
    generateToken(res, newUser._id);
    return successData(res, "User registered successfully", newUser, true);
  }
);
