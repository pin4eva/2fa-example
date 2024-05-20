import axios from "axios";

const BASE_URL = import.meta.env.API_URL || "http://localhost:8001/api/";

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";
authApi.defaults.baseURL = BASE_URL;
