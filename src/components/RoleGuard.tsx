import { Navigate } from "react-router-dom";
import { getUserRoles } from "../lib/auth";

export default function RoleGuard({
  allowedRoles,
  children,
}: {
  allowedRoles: string[];
  children: React.ReactNode;
}) {
  const roles = getUserRoles();

  if (!allowedRoles.some((r) => roles.includes(r))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
