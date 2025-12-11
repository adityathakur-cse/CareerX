import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Auth-Slice/authSlice";
import companySlice from "./Company-Slice/companySlice";
import studentSlice from "./Student-Slice/studentSlice";
import internshipSlice from "./Internship-Slice/internshipSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    company: companySlice,
    student: studentSlice,
    internship: internshipSlice,
  },
});

export default store;
