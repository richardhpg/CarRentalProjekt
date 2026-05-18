import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext.jsx";

function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
