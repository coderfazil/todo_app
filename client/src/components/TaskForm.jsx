function TaskForm({
  value,
  onChange,
  onSubmit,
  submitLabel,
  placeholder,
  onCancel,
  isSubmitting,
  loadingLabel,
}) {
  return (
    <form className="task-form" onSubmit={onSubmit}>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={isSubmitting}
      />
      <button className="primary-button add-btn" type="submit" disabled={isSubmitting}>
        {isSubmitting ? loadingLabel || "Saving..." : submitLabel}
      </button>
      {onCancel ? (
        <button
          className="secondary-button"
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>
      ) : null}
    </form>
  );
}

export default TaskForm;
