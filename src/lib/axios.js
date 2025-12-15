import axios from "axios";

const instance = axios.create({
  baseURL: "https://foodapp-back-k58d.onrender.com",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
