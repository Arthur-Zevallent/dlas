import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface RoleRouteProps {
  allowedRoles: string[];
  redirectTo: string; // Wajib diisi (misal: "/pos/login" atau "/admin/login")
}

export default function RoleRoute({
  allowedRoles,
  redirectTo,
}: RoleRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm font-medium text-gray-600">Memuat...</p>
      </div>
    );
  }

  // 1. JIKA USER TIDAK ADA / BELUM LOGIN -> REDIRECT KE LOGIN SESUAI PROP
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // 2. CEK APAKAH ROLE USER SESUAI DENGAN ALLOWED ROLES
  const normalizedUserRole = user.role?.toLowerCase();
  const isAllowed = allowedRoles.some(
    (role) => role.toLowerCase() === normalizedUserRole
  );

  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
}