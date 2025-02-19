import { createSlice } from "@reduxjs/toolkit";

interface userModalSliceProps{
    isUserModal:boolean;
}

const initialState:userModalSliceProps = {
    isUserModal: false,
}

const userModalSlice = createSlice({
    name: 'userModal',
    initialState,
    reducers: {
        setUserModalState:(state)=>{
            state.isUserModal =true;  
        },
        resetUserModalState:(state)=>{
            state.isUserModal =false;  
        }
    }
})

export const {setUserModalState,resetUserModalState}= userModalSlice.actions;
export default userModalSlice.reducer;