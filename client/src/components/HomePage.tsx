"use client";
import { useRoot } from "@/Context/RootProvider";
import { checkAuth } from "@/utils/checkAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Chat from "./Chat";
import { TryCatch } from "@/utils/TryCatch";
import { useQuery } from "@tanstack/react-query";
import requestAPI from "@/utils/requestAPI";
import { usersConfig } from "@/apiHelpers/users";
import { UserTypes } from "../../types/AuthType";
import { useDispatch, useSelector } from "react-redux";
import { addUsers } from "../../redux/slices/userSlice";
import { RootState } from "../../redux/store/store";
import { userMessagesConfig } from "@/apiHelpers/userMessages";
import useUsers from "../../hooks/useUsers";
import { useMessages } from "../../hooks/useMessages";
const HomePage = () => {
  const router = useRouter();
  const { auth } = useRoot();
  useEffect(() => {
    checkAuth(auth?._id || "", router);
  }, [auth?._id, router]);

  useUsers();

  return (
    <div className="p-20">
      <Chat />
    </div>
  );
};

export default HomePage;
