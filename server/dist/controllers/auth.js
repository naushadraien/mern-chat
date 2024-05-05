import { TryCatch } from "../middlewares/error.js";
import User from "../models/user.js";
import { errorMessage, successData } from "../utils/utility-func.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
export const registerUser = TryCatch(async (req, res, next) => {
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
});
export const loginUser = TryCatch(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return errorMessage(next, "Incorrect email or password", 400);
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
        return errorMessage(next, "Invalid email or password", 400);
    }
    generateToken(res, user._id);
    return successData(res, "Logged in successfully", user);
});
export const getAllUsers = TryCatch(async (req, res, next) => {
    const users = await User.find({
        _id: {
            $ne: req.user,
        },
    });
    if (users.length === 0) {
        return errorMessage(next, "No users found", 404);
    }
    return successData(res, "", users);
});
