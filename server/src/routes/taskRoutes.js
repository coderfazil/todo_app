import { Router } from "express";
import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../controllers/taskController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = Router();

router.use(protect);
router.route("/").post(addTask).get(getTasks);
router.route("/:id").put(updateTask).delete(deleteTask);

export default router;
