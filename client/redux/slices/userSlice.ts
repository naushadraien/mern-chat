import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { UserTypes } from "../../types/AuthType";

interface IntialStateType {
  user: UserTypes[] | null;
  selectedUserId: string;
}

const initialState: IntialStateType = {
  user: null,
  selectedUserId: "",
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUsers: (state: IntialStateType, action: PayloadAction<UserTypes[]>) => {
      state.user = action.payload;
    },
    addSelectedUserId: (
      state: IntialStateType,
      action: PayloadAction<string>
    ) => {
      state.selectedUserId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUsers, addSelectedUserId } = userSlice.actions;

export default userSlice.reducer;
