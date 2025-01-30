import { createSlice} from "@reduxjs/toolkit";

interface  contentSliceProps {
    value:boolean;
}

const initialState:contentSliceProps = {
    value:false,
}

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {

        toggleState:(state)=>{
            state.value =!state.value;  
 
        }
    }
});

export const { toggleState } = contentSlice.actions;
export default contentSlice.reducer;
