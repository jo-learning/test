// src/data/services/apiClient.js
import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3010",
  withCredentials: true,
});
