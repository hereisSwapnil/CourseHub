import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/rootReducer";

// creating a store using configureStore and passing the root reducer
const store = configureStore({
  reducer: rootReducer,
});

// exporting the store
export default store;
