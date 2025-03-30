import { useEffect, useState } from 'react';
import {
  FaUsers,
  FaTshirt,
  FaTruckLoading,
  FaShippingFast,
  FaCheckCircle,
  FaBox,
  FaChartLine,
  FaClipboardList,
} from 'react-icons/fa';

const MetricCard = ({ icon, label, value, color }) => (
  <div className="bg-white shadow-lg rounded-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl">
    <div className="flex items-center space-x-4">
      <div className={`text-4xl text-${color}-500`}>{icon}</div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{label}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    users: 0,
    products: {
      total: 0,
      hoodies: 0,
      tshirts: 0,
      oversizeTshirts: 0,
      coupleTshirts: 0
    },
    orders: {
      pending: 0,
      inTransit: 0,
      delivered: 0,
    },
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersResponse, productsResponse, ordersResponse] = await Promise.all([
          fetch("https://backend.abhinavsofficial.com/api/auth/getusers/"),
          fetch("https://backend.abhinavsofficial.com/api/product/getproducts"),
          fetch("https://backend.abhinavsofficial.com/api/order/orders"),
        ]);

        const usersData = await usersResponse.json();
        const productsData = await productsResponse.json();
        const ordersData = await ordersResponse.json();

        const hoodies = productsData.filter((product) => product.category === "Hoodies").length;
        const tshirts = productsData.filter((product) => product.category === "Tshirt").length;
        const oversizeTshirts = productsData.filter(
          (product) => product.category === "Oversize-Tshirt"
        ).length;
        const coupleTshirts = productsData.filter(
          (product) => product.category === "Couple-Tshirt"
        ).length;

        const pendingOrders = ordersData.filter((order) => order.status === "Pending").length;
        const inTransitOrders = ordersData.filter((order) => order.status === "In Transit").length;
        const deliveredOrders = ordersData.filter((order) => order.status === "Delivered").length;

        setDashboardData({
          users: usersData.length,
          products: {
            total: productsData.length,
            hoodies,
            tshirts,
            oversizeTshirts,
            coupleTshirts,
          },
          orders: {
            pending: pendingOrders,
            inTransit: inTransitOrders,
            delivered: deliveredOrders,
          },
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center">
            <FaChartLine className="mr-3 text-blue-500" /> Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Your system metrics at a glance</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            icon={<FaUsers />}
            label="Total Users"
            value={dashboardData.users}
            color="blue"
          />

          <div className="bg-white shadow-lg rounded-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl">
            <div className="flex items-center space-x-4 mb-4">
              <FaTshirt className="text-4xl text-green-500" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
                <p className="text-2xl font-bold text-gray-800">{dashboardData.products.total}</p>
              </div>
            </div>
            <div className="pl-14 space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Hoodies:</span>
                <span className="font-semibold">{dashboardData.products.hoodies}</span>
              </div>
              <div className="flex justify-between">
                <span>T-Shirts:</span>
                <span className="font-semibold">{dashboardData.products.tshirts}</span>
              </div>
              <div className="flex justify-between">
                <span>Oversize T-Shirts:</span>
                <span className="font-semibold">{dashboardData.products.oversizeTshirts}</span>
              </div>
              <div className="flex justify-between">
                <span>Couple T-Shirts:</span>
                <span className="font-semibold">{dashboardData.products.coupleTshirts}</span>
              </div>
            </div>
          </div>

          <MetricCard
            icon={<FaTruckLoading />}
            label="Pending Orders"
            value={dashboardData.orders.pending}
            color="yellow"
          />
          <MetricCard
            icon={<FaShippingFast />}
            label="In Transit Orders"
            value={dashboardData.orders.inTransit}
            color="purple"
          />
          <MetricCard
            icon={<FaCheckCircle />}
            label="Delivered Orders"
            value={dashboardData.orders.delivered}
            color="green"
          />
          <MetricCard
            icon={<FaBox />}
            label="Inventory Status"
            value={dashboardData.products.total}
            color="indigo"
          />
          <MetricCard
            icon={<FaClipboardList />}
            label="Total Orders"
            value={
              dashboardData.orders.pending +
              dashboardData.orders.inTransit +
              dashboardData.orders.delivered
            }
            color="orange"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
