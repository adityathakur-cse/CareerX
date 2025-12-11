import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  internships: [],
  selectedInternship: null,
  isLoading: false,
  error: null,

  filters: {
    searchQuery: "",
    locationQuery: "",
    internshipTypes: [],
    durations: [],
    stipendRanges: [],
    sortBy: "latest",
  },
};

const internshipSlice = createSlice({
  name: "internshipSlice",
  initialState,
});

export default internshipSlice.reducer;
