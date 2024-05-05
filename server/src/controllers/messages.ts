import { register } from "module";
import { TryCatch } from "../middlewares/error.js";
import { CustomRequest, MessageType, UserType } from "../types/types.js";
import { errorMessage, successData } from "../utils/utility-func.js";
import Conversation from "../models/Conversation.js";
import Messages from "../models/Messages.js";

export const addMessages = TryCatch(
  async (req: CustomRequest<MessageType>, res, next) => {
    const { message } = req.body;
    const { id: receiverId } = req.params;

    // Note: req.user.id is a string representation of the MongoDB ObjectId. If you need the ObjectId instance, use req.user._id instead.
    const senderId = req.user?.id;
    console.log(senderId, receiverId);

    if (senderId === receiverId) {
      return errorMessage(next, "You cannot send message to you", 400);
    }

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessages = await Messages.create({
      message,
      senderId,
      receiverId,
    });

    if (newMessages) {
      conversation.messages.push(newMessages._id);
    }

    await Promise.all([conversation.save(), newMessages.save()]);

    return successData(res, "messages created successfully", newMessages, true);
  }
);

export const getMessagesBetweenTwoUsers = TryCatch(
  async (req: CustomRequest<UserType>, res, next) => {
    const senderId = req.user?.id;
    const { id: receiverId } = req.params;

    if (senderId === receiverId) {
      return errorMessage(next, "You cannot get message of yourself", 400);
    }

    const messages = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    }).populate("messages");
    console.log(messages);

    if (!messages) {
      return errorMessage(next, "No messages found", 404);
    }
    return successData(res, "", messages);
  }
);
