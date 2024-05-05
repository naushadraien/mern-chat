import express from "express";
import "dotenv/config";
import mainRouter from "./routes/index.js";
import chatConfig from "./config/index.js";
import { errorMiddleware } from "./middlewares/error.js";
import connectDB from "./utils/feature.js";
import cookieParser from "cookie-parser";
connectDB(chatConfig.Mongo_URI);
const app = express();
app.get("/", (req, res) => {
    res.send("Api is working on /api/v1");
});
app.use(express.json());
app.use(cookieParser());
mainRouter(app);
app.use(errorMiddleware);
app.listen(chatConfig.PORT, () => {
    console.log(`Server is working on http://localhost:${chatConfig.PORT}`);
});
export default app;
