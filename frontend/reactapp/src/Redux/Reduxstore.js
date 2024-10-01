import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Utilise localStorage
import { authReducer } from "./Authreducer.js";
import { userReducer } from "./Userreducer.js";

// Configuration de redux-persist
const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

// Crée le reducer persistant
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST', 
          'persist/REHYDRATE', 
          'persist/FLUSH', 
          'persist/PAUSE', 
          'persist/PURGE', 
          'persist/REGISTER'
        ], // Ignorer ces actions pour éviter les avertissements
      },
    }),
  devTools: true,
});

// Crée un persistor
export const persistor = persistStore(store);
export default store;
