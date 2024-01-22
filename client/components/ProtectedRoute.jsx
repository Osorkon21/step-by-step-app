import { Navigate } from "react-router-dom"
import { useAppCtx } from "../utils/AppProvider";

export default function ProtectedRoute({ children }) {
  const { user } = useAppCtx()

  if (!user.email) {
    <Navigate to="/" replace />;
  }

  return children;
};
