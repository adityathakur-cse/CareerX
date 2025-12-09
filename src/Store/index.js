import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth-Slice/authSlice";
import companySlice from "./Company-Slice/companySlice";
import userSlice from "./User-Slice/userSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    company: companySlice,
    student: userSlice,
  },
});

export default store;
