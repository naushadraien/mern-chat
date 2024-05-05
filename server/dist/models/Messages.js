import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, "Please provide message"],
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide senderId"],
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide senderId"],
    },
}, { timestamps: true });
const Messages = mongoose.model("Message", messageSchema);
export default Messages;
