import { ConfigType } from "@/utils/requestAPI";

export const usersConfig = {
  getAllUsersExceptLoggedInUser: (): ConfigType => ({
    method: "get",
    url: "/auth",
    withCredentials: true,
  }),
};
