import axiosInstance from "../api/axiosInstance";

export const fetchTasks = async () => {
  const { data } = await axiosInstance.get("/tasks");
  return data;
};

export const createTask = async (payload) => {
  const { data } = await axiosInstance.post("/tasks", payload);
  return data;
};

export const updateTask = async (taskId, payload) => {
  const { data } = await axiosInstance.put(`/tasks/${taskId}`, payload);
  return data;
};

export const deleteTask = async (taskId) => {
  const { data } = await axiosInstance.delete(`/tasks/${taskId}`);
  return data;
};
