// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api", // Ensure this matches your backend
  withCredentials: true, // Include credentials for cookies/sessions if needed
});

// src/api.js
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(`API error: ${error.response.status} - ${error.response.data.message}`);
    } else {
      console.error("Network error:", error.message);
    }
    return Promise.reject(error);
  }
);


export default api;
