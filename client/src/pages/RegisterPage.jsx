import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const nextErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Name is required";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!values.password.trim()) {
      nextErrors.password = "Password is required";
    } else if (values.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiError("");

    if (!validate()) {
      return;
    }

    try {
      await register(values);
      navigate("/dashboard");
    } catch (error) {
      setApiError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthForm
      title="Create your account"
      fields={[
        {
          name: "name",
          label: "Name",
          type: "text",
          placeholder: "Enter your name",
        },
        {
          name: "email",
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "Create a password",
        },
      ]}
      values={values}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="Register"
      footerText="Already have an account?"
      footerLink="/login"
      footerLabel="Login"
      apiError={apiError}
    />
  );
}

export default RegisterPage;
