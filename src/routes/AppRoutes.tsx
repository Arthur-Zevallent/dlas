import { Routes, Route, Navigate } from "react-router-dom";

import AdminLogin from "../pages/Auth/AdminLogin";
import Dashboard from "../pages/Admin/Dashboard";
import AdminTransactionList from "../pages/Admin/AdminTransactionList";
import AdminUser from "../pages/Admin/AdminUser";
import AdminTicket from "../pages/Admin/AdminTicket";
import AdminContent from "../pages/Admin/AdminContent";
import AddTicket from "../pages/Admin/AddTicket";
import EditTicket from "../pages/Admin/EditTicket";

import PosMain from "../pages/Pos/PosMain";
import PosTransactionList from "../pages/Pos/PosTransactionList";

import RoleRoutes from "./RoleRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/transactionlist" element={<AdminTransactionList />} />
      <Route path="/admin/userlist" element={<AdminUser />} />
      <Route path="/admin/ticket" element={<AdminTicket />} />
      <Route path="/admin/websitecontent" element={<AdminContent />} />
      <Route path="/admin/add-ticket" element={<AddTicket />} />
      <Route path="/admin/edit-ticket" element={<EditTicket />} />

      <Route path="/pos" element={<PosMain />} />
      <Route path="/pos/transactionlist" element={<PosTransactionList />} />

      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}