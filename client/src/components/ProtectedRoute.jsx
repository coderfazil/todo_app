import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="page-shell">
        <div className="loading-panel centered">
          <div className="loading-spinner" aria-hidden="true" />
          <div>
            <p className="eyebrow">Checking Session</p>
            <h2>Signing you in</h2>
            <p>Restoring your account before loading the dashboard.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
