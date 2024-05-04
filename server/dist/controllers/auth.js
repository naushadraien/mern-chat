import { TryCatch } from "../middlewares/error.js";
export const registerUser = TryCatch(async (req, res, next) => {
    const { fullName, email, password, confirmPassword, gender, imgUrl } = req.body;
    console.log(fullName, email, password, confirmPassword, gender, imgUrl);
});
