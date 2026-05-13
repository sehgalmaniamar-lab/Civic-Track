import axios from "axios";

const API = axios.create({
  baseURL:
    "https://civic-track-backend.onrender.com/api",
});

export default API;