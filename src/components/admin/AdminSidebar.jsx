
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  LogOut,
  Store
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/admin",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      activeColor: "border-blue-400"
    },
    {
      path: "/admin/products",
      icon: <Package size={20} />,
      label: "Manage Products",
      activeColor: "border-green-400"
    },
    {
      path: "/admin/users",
      icon: <Users size={20} />,
      label: "Manage Users",
      activeColor: "border-purple-400"
    },
    {
      path: "/admin/orders",
      icon: <ShoppingCart size={20} />,
      label: "Manage Orders",
      activeColor: "border-orange-400"
    }
  ];

  return (
    <div className="w-64 bg-gray-800 h-screen fixed left-0 top-0">
      {/* Header */}
      <div className="p-6 border-b border-gray-700 flex items-center space-x-2">
        <Store size={28} className="text-blue-400" />
        <h1 className="text-2xl font-semibold text-white">Admin Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`
              flex items-center space-x-3 p-3 rounded-lg 
              ${location.pathname === item.path 
                ? `text-white bg-gray-700 border-l-4 ${item.activeColor}` 
                : 'text-gray-300 hover:text-white hover:bg-gray-700'}
              transition-all duration-200 group
            `}
          >
            <span className="group-hover:transform group-hover:scale-110 transition-transform">
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}

        {/* Logout */}
        <Link
          to="/"
          className="absolute bottom-16 left-0 right-0 mx-4 flex items-center 
                   space-x-3 p-3 rounded-lg text-red-400 hover:text-red-300 
                   hover:bg-red-900/20 transition-all duration-200 group"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;