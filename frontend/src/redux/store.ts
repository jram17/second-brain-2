import { configureStore } from "@reduxjs/toolkit";
import stateSlice from "./Slices/stateSlice";
import modalSlice from "./Slices/modalSlice"
export const store=configureStore({
    reducer:{
        state:stateSlice,
        modal:modalSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;