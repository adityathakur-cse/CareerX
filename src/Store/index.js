import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth-Slice/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
