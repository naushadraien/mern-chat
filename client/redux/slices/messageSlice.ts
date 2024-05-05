import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { MessageType } from "../../types/AuthType";

interface IntialStateType {
  message: MessageType[] | null;
}

const initialState: IntialStateType = {
  message: null,
};

export const messageSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addMessages: (
      state: IntialStateType,
      action: PayloadAction<MessageType[]>
    ) => {
      state.message = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMessages } = messageSlice.actions;

export default messageSlice.reducer;
