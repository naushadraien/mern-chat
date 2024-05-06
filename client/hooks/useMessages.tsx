import { userMessagesConfig } from "@/apiHelpers/userMessages";
import requestAPI from "@/utils/requestAPI";
import { TryCatch } from "@/utils/TryCatch";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useMessages = (selectedUserId: string | undefined) => {
  const [messages, setMessages] = useState<string[]>([]);
  const { data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      TryCatch(async () => {
        const data = await requestAPI(
          userMessagesConfig.userMessage(selectedUserId || "")
        );
        setMessages(data.data.messages);
        return data.data;
      }),
  });

  return { data, messages, setMessages };
};
