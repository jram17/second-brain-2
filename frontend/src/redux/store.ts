import { configureStore } from "@reduxjs/toolkit";
import stateSlice from "./Slices/stateSlice";
import modalSlice from "./Slices/modalSlice";
import contentSlcie from "./Slices/contentSlice";
import userModalSlice from "./Slices/userModalSlice"
export const store=configureStore({
    reducer:{
        state:stateSlice,
        modal:modalSlice,
        content:contentSlcie,
        userModal:userModalSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;