import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StateSliceProps {
    value: string;
}

const initialState: StateSliceProps = {
    value: 'All Memories',
}

const stateSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {
        setState: (state, action: PayloadAction<string>) => {
            state.value = action.payload;  
        },
        resetState: (state) => {
            state.value = 'All Memories';
        }
    }
});

export const { setState, resetState } = stateSlice.actions;
export default stateSlice.reducer;
