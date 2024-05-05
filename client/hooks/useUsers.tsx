import { usersConfig } from "@/apiHelpers/users";
import requestAPI from "@/utils/requestAPI";
import { TryCatch } from "@/utils/TryCatch";
import { useQuery } from "@tanstack/react-query";
import { UserTypes } from "../types/AuthType";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUsers } from "../redux/slices/userSlice";

const useUsers = () => {
  const dispatch = useDispatch();
  const { data } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      TryCatch(async () => {
        const data = await requestAPI(
          usersConfig.getAllUsersExceptLoggedInUser()
        );
        return data.data as UserTypes[];
      }),
  });
  useEffect(() => {
    if (data) {
      dispatch(addUsers(data));
    }
  }, [data, dispatch]);

  return { data };
};

export default useUsers;
