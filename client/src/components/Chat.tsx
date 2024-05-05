import { useRoot } from "@/Context/RootProvider";
import { usersConfig } from "@/apiHelpers/users";
import { TryCatch } from "@/utils/TryCatch";
import requestAPI from "@/utils/requestAPI";
import { useQuery } from "@tanstack/react-query";
import { LogOut, Search } from "lucide-react";
import { useState } from "react";
import { UserTypes } from "../../types/AuthType";
// import MainChat from "./MainChat/MainChat";
// import NoChat from "./NoChat";
import Users from "./Users/Users";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { addSelectedUserId } from "../../redux/slices/userSlice";
import NoChat from "./Nochat";
import MainChat from "./MainChat/MainChat";

const Chat = () => {
  const dispatch = useDispatch();
  const selectedUserId = useSelector(
    (state: RootState) => state.users.selectedUserId
  );
  const { clearAuth } = useRoot();
  const users = useSelector((state: RootState) => state.users.user);
  const handleClick = (id: string) => {
    dispatch(addSelectedUserId(id));
  };

  const filteredUser = users?.filter((user) => user._id === selectedUserId);

  return (
    <div className="flex gap-10">
      <div className="flex-[20%] flex flex-col gap-4">
        <div className="flex justify-center flex-col gap-10 items-center relative">
          <Input placeholder="Search User..." className="pl-8" />
          <Search className="absolute top-2 left-2 text-gray-500" />
          <Separator />
        </div>
        {users?.map((user) => {
          return (
            <Users
              name={user.fullName}
              imgUrl={user.imgUrl}
              userId={user._id}
              isSelected={selectedUserId === user._id}
              onClick={() => handleClick(user._id)}
              key={user._id}
            />
          );
        })}
        <Button onClick={() => clearAuth()} variant="outline" className="w-16">
          <LogOut className="rotate-180" />
        </Button>
      </div>
      <div className="flex-[80%]">
        {filteredUser && filteredUser?.length > 0 ? (
          filteredUser?.map((item) => <MainChat key={item._id} {...item} />)
        ) : (
          <NoChat />
        )}
      </div>
    </div>
  );
};

export default Chat;
