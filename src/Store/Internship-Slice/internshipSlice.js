import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  internships: [],
  selectedInternship: null,
  isLoading: false,

  filters: {
    searchQuery: "",
    locationQuery: "",
    internshipTypes: "",
    durations: "",
    stipendRanges: "",
    sortBy: "latest",
  },
};

export const fetchInternships = createAsyncThunk(
  "/internship/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/internships",
        {
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

export const selectFilteredInternships = createSelector(
  [
    (state) => state.internship.internships,
    (state) => state.internship.filters.searchQuery,
    (state) => state.internship.filters.locationQuery,
    (state) => state.internship.filters.internshipTypes,
    (state) => state.internship.filters.durations,
    (state) => state.internship.filters.stipendRanges,
    (state) => state.internship.filters.sortBy,
  ],
  (
    internships,
    searchQuery,
    locationQuery,
    internshipTypes,
    durations,
    stipendRanges,
    sortBy
  ) => {
    let result = [...internships];

    // SEARCH FILTER
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.skills.some((s) => s.toLowerCase().includes(q))
      );
    }

    // LOCATION FILTER
    if (locationQuery) {
      const q = locationQuery.toLowerCase();
      result = result.filter(
        (i) =>
          (i.location && i.location.toLowerCase().includes(q)) ||
          i.internshipType.toLowerCase().includes(q)
      );
    }

    // TYPE FILTER (SINGLE)
    if (internshipTypes) {
      result = result.filter((i) => i.internshipType === internshipTypes);
    }

    // DURATION FILTER (SINGLE)
    if (durations) {
      result = result.filter((i) => {
        const months = parseInt(i.duration);
        if (durations === "1 month" && months === 1) return true;
        if (durations === "2 months" && months === 2) return true;
        if (durations === "3 months+" && months >= 3) return true;
        return false;
      });
    }

    // STIPEND FILTER (SINGLE)
    if (stipendRanges) {
      result = result.filter((i) => {
        const stipend = i.stipend;
        if (stipendRanges === "Unpaid" && stipend === 0) return true;
        if (stipendRanges === "1k-5k" && stipend >= 1000 && stipend <= 5000)
          return true;
        if (stipendRanges === "5k-10k" && stipend > 5000 && stipend <= 10000)
          return true;
        if (stipendRanges === "10k+" && stipend > 10000) return true;
        return false;
      });
    }

    // SORTING
    if (sortBy === "latest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sortBy === "stipend-high") {
      result.sort((a, b) => b.stipend - a.stipend);
    } else if (sortBy === "stipend-low") {
      result.sort((a, b) => a.stipend - b.stipend);
    }

    return result;
  }
);

const internshipSlice = createSlice({
  name: "internshipSlice",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
    },
    setLocationQuery: (state, action) => {
      state.filters.locationQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    toggleInternshipType: (state, action) => {
      state.filters.internshipTypes =
        state.filters.internshipTypes === action.payload ? "" : action.payload;
    },

    toggleDuration: (state, action) => {
      state.filters.durations =
        state.filters.durations === action.payload ? "" : action.payload;
    },

    toggleStipendRange: (state, action) => {
      state.filters.stipendRanges =
        state.filters.stipendRanges === action.payload ? "" : action.payload;
    },

    clearFilters: (state) => {
      state.filters = {
        searchQuery: "",
        locationQuery: "",
        internshipTypes: "",
        durations: "",
        stipendRanges: "",
        sortBy: "latest",
      };
    },

    setSelectedInternship: (state, action) => {
      state.selectedInternship = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInternships.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchInternships.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchInternships.fulfilled, (state, action) => {
        state.isLoading = false;
        state.internships = action.payload.internships;
      });
  },
});

export const {
  setSearchQuery,
  setSortBy,
  setLocationQuery,
  toggleInternshipType,
  toggleDuration,
  toggleStipendRange,
  clearFilters,
  setSelectedInternship,
} = internshipSlice.actions;

export default internshipSlice.reducer;
