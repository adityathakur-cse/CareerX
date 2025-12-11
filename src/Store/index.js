import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth-Slice/authSlice";
import companySlice from "./Company-Slice/companySlice";
import studentSlice from "./Student-Slice/studentSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    company: companySlice,
    student: studentSlice,
  },
});

export default store;
