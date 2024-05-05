import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";
const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});
export const getReceiverSocketId = (receiverId) => {
    return userSocketIdMap[receiverId];
};
const userSocketIdMap = {}; // {userId: socketId}
io.on("connection", (socket) => {
    console.log("user connected with sockedId as ", socket.id);
    const userId = socket.handshake.query?.userId;
    console.log("userId", userId);
    if (typeof userId === "string")
        userSocketIdMap[userId] = socket.id;
    console.log(Object.keys(userSocketIdMap));
    socket.emit("getOnlineUser", Object.keys(userSocketIdMap));
    socket.on("disconnect", () => {
        console.log("user disconnected with socketId as ", socket.id);
        if (typeof userId === "string")
            delete userSocketIdMap[userId];
        socket.emit("getOnlineUser", Object.keys(userSocketIdMap));
    });
});
export { app, io, server };
