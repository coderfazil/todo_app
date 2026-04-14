import {
  createTask,
  deleteTaskById,
  getTasksByUser,
  updateTaskById,
} from "../services/taskService.js";

export const addTask = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const task = await createTask({ title, userId: req.user.userId });
    return res.status(201).json(task);
  } catch (error) {
    return next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const tasks = await getTasksByUser(req.user.userId);
    return res.json(tasks);
  } catch (error) {
    return next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { title, completed } = req.body;

    if (title !== undefined && !title.trim()) {
      return res.status(400).json({ message: "Task title cannot be empty" });
    }

    const task = await updateTaskById({
      taskId: req.params.id,
      userId: req.user.userId,
      updates: { title, completed },
    });

    return res.json(task);
  } catch (error) {
    return next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    await deleteTaskById({
      taskId: req.params.id,
      userId: req.user.userId,
    });

    return res.json({ message: "Task deleted successfully" });
  } catch (error) {
    return next(error);
  }
};
