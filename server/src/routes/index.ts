import { type Application } from "express";
import userRoutes from "./userRoutes.js";
import { validateData } from "../middlewares/validationMiddleware.js";
import authSchema from "../schema/userSchema.js";
const baseRouter = "/api/v1";
const mainRouter = (app: Application) => {
  app.use(`${baseRouter}/auth`, userRoutes);
};

export default mainRouter;
