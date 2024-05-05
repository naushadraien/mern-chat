import { userMessagesConfig } from "@/apiHelpers/userMessages";
import requestAPI from "@/utils/requestAPI";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addMessages } from "../redux/slices/messageSlice";
import { useEffect } from "react";
import { TryCatch } from "@/utils/TryCatch";

export const useMessages = (selectedUserId: string | undefined) => {
  const dispatch = useDispatch();
  const { data } = useQuery({
    queryKey: ["messages"],
    queryFn: () =>
      TryCatch(async () => {
        const data = await requestAPI(
          userMessagesConfig.userMessage(selectedUserId || "")
        );
        return data.data;
      }),
  });
  console.log("data", data);

  useEffect(() => {
    if (data) {
      dispatch(addMessages(data.messages));
    }
  }, [data, dispatch]);

  return { data };
};
