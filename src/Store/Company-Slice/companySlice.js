import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  profile: null,
  isProfileComplete: false,
  isLoading: false,
  Internships: [],
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

export const companyPostInternship = createAsyncThunk(
  "/company/postIntern",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/company/postintern",
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

export const fetchInterns = createAsyncThunk(
  "/company/interns",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/company/fetchIntern",
        {
          withCredentials: true,
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const deleteIntern = createAsyncThunk(
  "/company/deleteIntern",
  async (id, { rejectWithValue }) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/company/delete${id}`,
        {
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
    setLoading: (state, action) => {
      state.isLoading = action.payload;
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
      })
      .addCase(companyPostInternship.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(companyPostInternship.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload.userInfo;
      })
      .addCase(companyPostInternship.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchInterns.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchInterns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.Internships = action.payload.internships;
      })
      .addCase(fetchInterns.rejected, (state) => {
        state.isLoading = false;
        state.Internships = [];
      })
      .addCase(deleteIntern.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteIntern.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteIntern.fulfilled, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setProfile, setLoading } = companySlice.actions;

export default companySlice.reducer;
