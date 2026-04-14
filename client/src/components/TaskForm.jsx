function TaskForm({
  value,
  onChange,
  onSubmit,
  submitLabel,
  placeholder,
  onCancel,
}) {
  return (
    <form className="task-form" onSubmit={onSubmit}>
      <input value={value} onChange={onChange} placeholder={placeholder} />
      <button className="primary-button  add-btn" type="submit">
        {submitLabel}
      </button>
      {onCancel ? (
        <button className="secondary-button" type="button" onClick={onCancel}>
          Cancel
        </button>
      ) : null}
    </form>
  );
}

export default TaskForm;
