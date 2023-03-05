import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  isProcessingForm: false
};

const stipennySlice = createSlice({
  name: "stipenny",
  initialState,
  reducers: {
    setNotification(state, action) {
      state.message = action.payload;
    },
    setProcessingButton(state,action) {
      state.isProcessingForm = action.payload;
    },
  },
});

export const { setNotification, setProcessingButton } = stipennySlice.actions;

export default stipennySlice.reducer;
