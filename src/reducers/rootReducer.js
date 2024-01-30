// reducers/rootReducer.js
// importing the auth and course reducers
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import courseReducer from "./courseReducer";

// Combining the auth and course reducers into a single root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
});

// Exporting the root reducer
export default rootReducer;
