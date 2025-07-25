import axios from "axios";

export const API_ENDPOINT = process.env.NEXT_PUBLIC_URL;

const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosInstance as axios };
