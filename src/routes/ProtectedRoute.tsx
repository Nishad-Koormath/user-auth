import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import type { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, initialized } = useAppSelector(
    (state) => state.auth
  );

  if (!initialized) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
