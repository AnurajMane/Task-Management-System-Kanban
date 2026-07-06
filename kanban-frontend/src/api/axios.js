import axios from "axios";

const api = axios.create({
  baseURL: "https://task-management-system-kanban.onrender.com/api"
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getDashboardStats =
  async () => {
    const response =
      await api.get(
        "/dashboard/stats"
      );

    return response.data;
  };

export default api;