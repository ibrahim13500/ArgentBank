// Import modules:
import ReactDOM from "react-dom/client";
import React from "react";
import App from "./src/App";
import { BrowserRouter } from "react-router-dom";
import "./src/styles/utils/index.scss";
import store from "./src/services/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

// Render React application in "root" element using React Router and user data context.
const persistor = persistStore(store);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
