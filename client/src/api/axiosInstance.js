import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://todoapp-production-f4dd.up.railway.app/api",
  withCredentials: true,
});

export default axiosInstance;
