import express from "express";
import { getAllUsers, loginUser, registerUser } from "../controllers/auth.js";
import { validateData } from "../middlewares/validationMiddleware.js";
import authSchema from "../schema/userSchema.js";
import { authenticateUser } from "../utils/authenticateUser.js";

const app = express.Router();

app.get("/", authenticateUser, getAllUsers);
app.post("/register", validateData(authSchema.Register), registerUser);
app.post("/login", validateData(authSchema.Login), loginUser);

export default app;
