import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { UserSignUpType } from "../types/types.js";

export const registerUser = TryCatch(
  async (req: Request<{}, {}, UserSignUpType>, res, next) => {
    const { fullName, email, password, confirmPassword, gender, imgUrl } =
      req.body;

    console.log(fullName, email, password, confirmPassword, gender, imgUrl);
  }
);
