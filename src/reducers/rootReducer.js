import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer"; // Import your auth reducer
import courseReducer from "./courseReducer"; // Import your course reducer

const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
});

export default rootReducer;
