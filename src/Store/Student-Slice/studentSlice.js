import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  profile: null,
  isProfileComplete: false,
  isLoading: false,
  applications: [],
};

export const profileUpdate = createAsyncThunk(
  "/student/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/profileUpdate",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error?.response?.data);
    }
  }
);

const studentSlice = createSlice({
  initialState: initialState,
  name: "studentSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(profileUpdate.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(profileUpdate.fulfilled, (state, action) => {
        state.isLoading = true;
        state.profile = action.payload.userInfo;
      })
      .addCase(profileUpdate.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export default studentSlice.reducer;
