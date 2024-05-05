import userRoutes from "./userRoutes.js";
const baseRouter = "/api/v1";
const mainRouter = (app) => {
    app.use(`${baseRouter}/auth`, userRoutes);
};
export default mainRouter;
