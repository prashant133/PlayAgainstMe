import { Navigate } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";

export default function ProtectedRoute({ children }) {
  const { user } = useAuthUser();

  if (!user) return <Navigate to="/login" />;

  return children;
}
