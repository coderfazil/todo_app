function TaskItem({
  task,
  isEditing,
  editValue,
  onEditValueChange,
  onEditSubmit,
  onCancelEdit,
  onToggle,
  onDelete,
  onStartEdit,
  isBusy,
  busyAction,
}) {
  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <form className="task-edit-form" onSubmit={onEditSubmit}>
          <input value={editValue} onChange={onEditValueChange} disabled={isBusy} />
          <button className="primary-button" type="submit" disabled={isBusy}>
            {busyAction === "save" ? "Saving..." : "Save"}
          </button>
          <button
            className="secondary-button"
            type="button"
            onClick={onCancelEdit}
            disabled={isBusy}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div>
            <h3>{task.title}</h3>
            <p>{isBusy ? "Updating task..." : task.completed ? "Completed" : "Pending"}</p>
          </div>
          <div className="task-actions">
            <button
              className="secondary-button"
              type="button"
              onClick={onToggle}
              disabled={isBusy}
            >
              {busyAction === "toggle"
                ? "Updating..."
                : task.completed
                  ? "Mark Pending"
                  : "Mark Complete"}
            </button>
            <button
              className="secondary-button"
              type="button"
              onClick={onStartEdit}
              disabled={isBusy}
            >
              Edit
            </button>
            <button
              className="danger-button"
              type="button"
              onClick={onDelete}
              disabled={isBusy}
            >
              {busyAction === "delete" ? "Deleting..." : "Delete"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;
