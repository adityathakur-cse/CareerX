import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth-Slice/authSlice";
import companySlice from "./Company-Slice/companySlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    company: companySlice,
  },
});

export default store;
