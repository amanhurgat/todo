import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_BASE_URL, 
  headers: {
    "content-type": "application/json",
    authorization: `${localStorage.getItem("token")}`,
  },
});
