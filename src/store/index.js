import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/authReducer";
import stipennyReducer from "../reducers/stipennyReducer";

const store = configureStore({
  reducer: { auth: authReducer, stipenny: stipennyReducer },
});

export default store;
