import { configureStore } from "@reduxjs/toolkit";
import classInfoReducer from "./slices/classInfoSlice";

export const store = configureStore({
  reducer: {
    classInfo: classInfoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
