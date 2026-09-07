import { Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "../pages/Auth/AdminLogin";
import PosLogin from "../pages/Auth/PosLogin";

import Dashboard from "../pages/admin/Dashboard";
import AdminTransactionList from "../pages/admin/AdminTransactionList";
import AdminUser from "../pages/admin/AdminUser";
import AdminTicket from "../pages/admin/AdminTicket";
import AdminContent from "../pages/admin/AdminContent";
import AddTicket from "../pages/admin/AddTicket";
import EditTicket from "../pages/admin/EditTicket";

import PosMain from "../pages/pos/PosMain";
import PosTransactionList from "../pages/pos/PosTransactionList";

import RoleRoutes from "./RoleRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      {/* 1. ROUTE REDIRECT UTAMA (Direct URL /pos dan /admin paksa ke Login) */}
      <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      <Route path="/pos" element={<Navigate to="/pos/login" replace />} />

      {/* 2. ROUTE LOGIN (PUBLIC) */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/pos/login" element={<PosLogin />} />

      {/* 3. SUPERADMIN ROUTES (/admin/*) */}
      <Route
        element={
          <RoleRoutes
            allowedRoles={["superadmin", "SUPERADMIN"]}
            redirectTo="/admin/login"
          />
        }
      >
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route
          path="/admin/transactionlist"
          element={<AdminTransactionList />}
        />
        <Route path="/admin/userlist" element={<AdminUser />} />
        <Route path="/admin/ticket" element={<AdminTicket />} />
        <Route path="/admin/ticket/add" element={<AddTicket />} />
        <Route path="/admin/ticket/edit/:id" element={<EditTicket />} />
        <Route path="/admin/websitecontent" element={<AdminContent />} />
      </Route>

      {/* 4. POS ROUTES (/pos/*) */}
      <Route
        element={
          <RoleRoutes
            allowedRoles={[
              "admin",
              "superadmin",
              "SUPERADMIN",
              "adminl1",
              "admin_l1",
              "admin1",
              "pos",
              "admin_pos",
            ]}
            redirectTo="/pos/login"
          />
        }
      >
        <Route path="/pos/dashboard" element={<PosMain />} />
        <Route path="/pos/transactionlist" element={<PosTransactionList />} />
      </Route>

      {/* 5. FALLBACK ROUTE (Jika URL ngawur / tidak ditemukan) */}
      <Route path="/" element={<Navigate to="/admin/login" replace />} />
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  );
}