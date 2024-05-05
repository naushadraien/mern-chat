import express from "express";
import { loginUser, registerUser } from "../controllers/auth.js";
import { validateData } from "../middlewares/validationMiddleware.js";
import authSchema from "../schema/userSchema.js";
const app = express.Router();
app.post("/register", validateData(authSchema.Register), registerUser);
app.post("/login", validateData(authSchema.Login), loginUser);
export default app;
