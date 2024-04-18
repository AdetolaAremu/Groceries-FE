import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/App";
import { Provider } from "react-redux";
import { store } from "./store/RootReducer";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<AppLayout />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
