import { TryCatch } from "../middlewares/error.js";
import User from "../models/user.js";
import { errorMessage, successData } from "../utils/utility-func.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
export const registerUser = TryCatch(async (req, res, next) => {
    const { fullName, email, password, confirmPassword, gender, imgUrl } = req.body;
    if (password !== confirmPassword) {
        return errorMessage(next, "password does not match", 400);
    }
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        return errorMessage(next, "User already exists", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        fullName,
        email,
        password: hashedPassword,
        gender,
        imgUrl,
    });
    generateToken(res, newUser._id);
    return successData(res, "User registered successfully", newUser, true);
});
