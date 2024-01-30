// reducers/courseReducer.js
import { createSlice } from "@reduxjs/toolkit";

// creating a slice for courses
const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    selectedCourse: null,
    loading: false,
    error: null,
    isUserLiked: false,
  },
  reducers: {
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCoursesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCoursesSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    },
    fetchCoursesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSingleCourseStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSingleCourseSuccess: (state, action) => {
      state.loading = false;
      state.selectedCourse = action.payload;
    },
    fetchSingleCourseFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// exporting the reducer and actions
export const {
  fetchCoursesStart,
  fetchCoursesSuccess,
  fetchCoursesFailure,
  fetchSingleCourseStart,
  fetchSingleCourseSuccess,
  fetchSingleCourseFailure,
  setLoading,
  setSuccess,
  setError,
} = courseSlice.actions;
export default courseSlice.reducer;
