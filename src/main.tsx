import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.API_URL || "http://localhost:8001/api/";

axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.baseURL = BASE_URL;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);
