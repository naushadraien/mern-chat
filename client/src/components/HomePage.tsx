"use client";
import { usersConfig } from "@/apiHelpers/users";
import { useRoot } from "@/Context/RootProvider";
import { checkAuth } from "@/utils/checkAuth";
import requestAPI from "@/utils/requestAPI";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUsers } from "../../redux/slices/userSlice";
import { UserTypes } from "../../types/AuthType";
import Chat from "./Chat";
const HomePage = () => {
  const router = useRouter();
  const { auth } = useRoot();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const getUsers = async (myParams?: string) => {
    const data = await requestAPI(
      usersConfig.getAllUsersExceptLoggedInUser({
        search: myParams ? myParams : "",
      })
    );
    dispatch(addUsers(data.data));

    return data.data as UserTypes[];
  };

  const debouncedFunction = useCallback(
    debounce((myParams) => getUsers(myParams), 500),
    []
  );

  useEffect(() => {
    getUsers();
  }, []);

  // const debouncedSearchTerm = useDebounce(search, 500);

  // useEffect(() => {
  //   const getUsers = async (myParams?: string) => {
  //     const data = await requestAPI(
  //       usersConfig.getAllUsersExceptLoggedInUser({
  //         search: myParams ? myParams : "",
  //       })
  //     );
  //     dispatch(addUsers(data.data));

  //     return data.data as UserTypes[];
  //   };

  //   getUsers(debouncedSearchTerm);
  // }, [debouncedSearchTerm, dispatch]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
    debouncedFunction(value);
  };

  useEffect(() => {
    checkAuth(auth?._id || "", router);
  }, [auth?._id, router]);

  return (
    <div className="p-20">
      <Chat search={search} searchChange={handleSearchChange} />
    </div>
  );
};

export default HomePage;
