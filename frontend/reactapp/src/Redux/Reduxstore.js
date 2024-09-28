import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./Authreducer.js";
import { userReducer } from "./Userreducer.js";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;