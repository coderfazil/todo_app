import { Link } from "react-router-dom";

function AuthForm({
  title,
  fields,
  values,
  errors,
  onChange,
  onSubmit,
  submitLabel,
  isSubmitting,
  loadingLabel,
  footerText,
  footerLink,
  footerLabel,
  apiError,
}) {
  return (
    <div className="auth-layout">
      <div className="auth-panel">
        <p className="eyebrow">MERN To-Do Application</p>
        <h1>{title}</h1>
        <form className="auth-form" onSubmit={onSubmit}>
          {fields.map((field) => (
            <label key={field.name} className="field">
              <span>{field.label}</span>
              <input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={values[field.name]}
                onChange={onChange}
                disabled={isSubmitting}
              />
              {errors[field.name] ? <small>{errors[field.name]}</small> : null}
            </label>
          ))}
          {apiError ? <div className="form-error">{apiError}</div> : null}
          <button className="primary-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? loadingLabel || "Please wait..." : submitLabel}
          </button>
        </form>
        <p className="auth-footer">
          {footerText} <Link to={footerLink}>{footerLabel}</Link>
        </p>
      </div>
    </div>
  );
}

export default AuthForm;
