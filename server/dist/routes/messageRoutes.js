import express from "express";
import { addMessages, getMessagesBetweenTwoUsers, } from "../controllers/messages.js";
import { validateData } from "../middlewares/validationMiddleware.js";
import messageSchema from "../schema/messageSchema.js";
import { authenticateUser } from "../utils/authenticateUser.js";
const app = express.Router();
app.get("/:id", authenticateUser, getMessagesBetweenTwoUsers);
app.post("/add/:id", authenticateUser, validateData(messageSchema.AddMessage), addMessages);
export default app;
