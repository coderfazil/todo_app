import Task from "../models/Task.js";

export const createTask = async ({ title, userId }) =>
  Task.create({
    title: title.trim(),
    user: userId,
  });

export const getTasksByUser = async (userId) =>
  Task.find({ user: userId }).sort({ createdAt: -1 });

export const updateTaskById = async ({ taskId, userId, updates }) => {
  const task = await Task.findOne({ _id: taskId, user: userId });

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  if (typeof updates.title === "string") {
    task.title = updates.title.trim();
  }

  if (typeof updates.completed === "boolean") {
    task.completed = updates.completed;
  }

  await task.save();
  return task;
};

export const deleteTaskById = async ({ taskId, userId }) => {
  const task = await Task.findOneAndDelete({ _id: taskId, user: userId });

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }
};
