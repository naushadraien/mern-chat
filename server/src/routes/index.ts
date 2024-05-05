import { type Application } from "express";
import messageRoutes from "./messageRoutes.js";
import userRoutes from "./userRoutes.js";
const baseRouter = "/api/v1";
const mainRouter = (app: Application) => {
  app.use(`${baseRouter}/auth`, userRoutes);
  app.use(`${baseRouter}/message`, messageRoutes);
};

export default mainRouter;
