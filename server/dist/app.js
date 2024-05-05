import express from "express";
import "dotenv/config";
import mainRouter from "./routes/index.js";
import chatConfig from "./config/index.js";
import { errorMiddleware } from "./middlewares/error.js";
import connectDB from "./utils/feature.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./socket/socket.js";
connectDB(chatConfig.Mongo_URI);
app.get("/", (req, res) => {
    res.send("Api is working on /api/v1");
});
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(cookieParser());
mainRouter(app);
app.use(errorMiddleware);
server.listen(chatConfig.PORT, () => {
    console.log(`Server is working on http://localhost:${chatConfig.PORT}`);
});
export default app;
