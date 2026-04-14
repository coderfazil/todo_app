import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskItem from "../components/TaskItem";
import { useAuth } from "../context/AuthContext";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask,
} from "../services/taskService";

function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState("");
  const [editValue, setEditValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await fetchTasks();
        setTasks(response);
      } catch (loadError) {
        setError(loadError.response?.data?.message || "Could not load tasks");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const filteredTasks = (() => {
    if (filter === "completed") {
      return tasks.filter((task) => task.completed);
    }

    if (filter === "pending") {
      return tasks.filter((task) => !task.completed);
    }

    return tasks;
  })();

  const handleAddTask = async (event) => {
    event.preventDefault();
    setError("");

    if (!newTask.trim()) {
      setError("Task title is required");
      return;
    }

    try {
      const task = await createTask({ title: newTask });
      setTasks((current) => [task, ...current]);
      setNewTask("");
    } catch (createError) {
      setError(createError.response?.data?.message || "Could not add task");
    }
  };

  const handleToggle = async (task) => {
    try {
      const updatedTask = await updateTask(task._id, {
        completed: !task.completed,
      });
      setTasks((current) =>
        current.map((item) => (item._id === task._id ? updatedTask : item))
      );
    } catch (updateError) {
      setError(updateError.response?.data?.message || "Could not update task");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((current) => current.filter((task) => task._id !== taskId));
    } catch (deleteError) {
      setError(deleteError.response?.data?.message || "Could not delete task");
    }
  };

  const handleEditSubmit = async (event, taskId) => {
    event.preventDefault();

    if (!editValue.trim()) {
      setError("Task title cannot be empty");
      return;
    }

    try {
      const updatedTask = await updateTask(taskId, { title: editValue });
      setTasks((current) =>
        current.map((task) => (task._id === taskId ? updatedTask : task))
      );
      setEditTaskId("");
      setEditValue("");
    } catch (updateError) {
      setError(updateError.response?.data?.message || "Could not edit task");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="page-shell">
      <div className="dashboard">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Task Dashboard</p>
            <h1>{user?.name}'s To-Do List</h1>
            <p>{user?.email}</p>
          </div>
          <button className="secondary-button" type="button" onClick={handleLogout}>
            Logout
          </button>
        </header>

        <section className="dashboard-grid">
          <div className="panel">
            <h2>Add a task</h2>
            <TaskForm
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
              onSubmit={handleAddTask}
              submitLabel="Add Task"
              placeholder="What needs to be done?"
            />
            {error ? <div className="form-error">{error}</div> : null}
            <div className="filter-row">
              <button
                type="button"
                className={filter === "all" ? "filter-button active" : "filter-button"}
                onClick={() => setFilter("all")}
              >
                All
              </button>
              <button
                type="button"
                className={
                  filter === "pending" ? "filter-button active" : "filter-button"
                }
                onClick={() => setFilter("pending")}
              >
                Pending
              </button>
              <button
                type="button"
                className={
                  filter === "completed" ? "filter-button active" : "filter-button"
                }
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="panel">
            <h2>Your tasks</h2>
            {loading ? <p>Loading tasks...</p> : null}
            {!loading && filteredTasks.length === 0 ? (
              <p>No tasks found for this filter.</p>
            ) : null}
            <div className="task-list">
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  isEditing={editTaskId === task._id}
                  editValue={editValue}
                  onEditValueChange={(event) => setEditValue(event.target.value)}
                  onEditSubmit={(event) => handleEditSubmit(event, task._id)}
                  onCancelEdit={() => {
                    setEditTaskId("");
                    setEditValue("");
                  }}
                  onToggle={() => handleToggle(task)}
                  onDelete={() => handleDelete(task._id)}
                  onStartEdit={() => {
                    setEditTaskId(task._id);
                    setEditValue(task.title);
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;
