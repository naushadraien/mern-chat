import { TryCatch } from "../middlewares/error.js";
export const registerUser = TryCatch(async (req, res, next) => {
    console.log("hello");
});
