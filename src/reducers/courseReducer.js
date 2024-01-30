// reducers/courseReducer.js
import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    selectedCourse: null,
    loading: false,
    error: null,
    isUserLiked: false, // Added state for checking if user liked a course
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
