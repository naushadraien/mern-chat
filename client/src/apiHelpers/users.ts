import { ConfigType } from "@/utils/requestAPI";
type GetUserPramsType = {
  search?: string;
  page?: number;
  limit?: number;
};

export const usersConfig = {
  getAllUsersExceptLoggedInUser: (params?: GetUserPramsType): ConfigType => ({
    method: "get",
    url: "/auth",
    params,
    withCredentials: true,
  }),
};
