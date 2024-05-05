import { z } from "zod";

const messageSchema = {
  AddMessage: z.object({
    message: z.string({
      message: "Message is required",
    }),
  }),
};

export default messageSchema;
