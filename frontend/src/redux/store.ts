import { configureStore } from "@reduxjs/toolkit";
import stateSlice from "./Slices/stateSlice";
import modalSlice from "./Slices/modalSlice";
import contentSlcie from "./Slices/contentSlice";
export const store=configureStore({
    reducer:{
        state:stateSlice,
        modal:modalSlice,
        content:contentSlcie
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;