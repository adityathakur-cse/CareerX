import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  profile: null,
  isProfileComplete: false,
  isLoading: false,
};

export const companyProfileUpdate = createAsyncThunk(
  "/company/profile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/company/updateprofile",
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
      return rejectWithValue(error?.response?.data);
    }
  }
);

const companySlice = createSlice({
  name: "companySlice",
  initialState: initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(companyProfileUpdate.rejected, (state) => {
        state.isProfileComplete = false;
        state.isLoading = false;
      })
      .addCase(companyProfileUpdate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload.userInfo;
      })
      .addCase(companyProfileUpdate.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export const { setProfile } = companySlice.actions;

export default companySlice.reducer;
