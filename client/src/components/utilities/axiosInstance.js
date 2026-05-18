import axios from "axios";

const db_url = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: db_url,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
