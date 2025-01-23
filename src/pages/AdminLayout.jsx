import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main content area - add left margin to accommodate sidebar */}
      <div className="flex-1 ml-64 overflow-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;