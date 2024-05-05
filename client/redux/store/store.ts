import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/userSlice";
import messagesReducer from "../slices/messageSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    messages: messagesReducer,
  },
});
// export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
