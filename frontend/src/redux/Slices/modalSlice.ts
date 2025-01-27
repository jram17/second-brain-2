import { createSlice } from "@reduxjs/toolkit";

interface ModalSliceProps {
  isModal: boolean;
}

const initialState: ModalSliceProps = {
  isModal: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    // setModalState: (state, action: PayloadAction<boolean>) => {
    //   state.isModal = action.payload;
    // },
    setModalState: (state) => {
      state.isModal = true;
    },
    resetModalState: (state => {
      state.isModal = false;
    })
  },
});

export const { setModalState, resetModalState } = modalSlice.actions;
export default modalSlice.reducer;
