import { configureStore } from "@reduxjs/toolkit";
import loginUser from "./features/LoginUser";
import getUserProfile from "./features/GetUserProfile";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// configurePersist:
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  loginUser,
  getUserProfile,
});

const persistedReducer = persistReducer(persistConfig, reducer);

// configureStore:
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Export store
export default store;
