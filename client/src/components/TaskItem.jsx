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
}) {
  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <form className="task-edit-form" onSubmit={onEditSubmit}>
          <input value={editValue} onChange={onEditValueChange} />
          <button className="primary-button" type="submit">
            Save
          </button>
          <button className="secondary-button" type="button" onClick={onCancelEdit}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div>
            <h3>{task.title}</h3>
            <p>{task.completed ? "Completed" : "Pending"}</p>
          </div>
          <div className="task-actions">
            <button className="secondary-button" type="button" onClick={onToggle}>
              {task.completed ? "Mark Pending" : "Mark Complete"}
            </button>
            <button className="secondary-button" type="button" onClick={onStartEdit}>
              Edit
            </button>
            <button className="danger-button" type="button" onClick={onDelete}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;
