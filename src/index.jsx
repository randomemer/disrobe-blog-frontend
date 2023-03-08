import "@/modules/firebase";
import reduxStore from "@/modules/redux-store";
import reportWebVitals from "@/modules/reportWebVitals";
import router from "@/modules/router";
import { ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom/client";
import * as Redux from "react-redux";
import { RouterProvider } from "react-router-dom";
import { theme } from "./modules/mui-config";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Redux.Provider store={reduxStore}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Redux.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
