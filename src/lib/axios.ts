import axios from "axios";

export const API_ENDPOINT = "http://localhost:3000";

const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosInstance as axios };
