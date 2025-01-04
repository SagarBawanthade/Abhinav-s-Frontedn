import Spinner from '../components/Spinner';
import { Eye, RotateCw, Check, Clock, Truck } from 'lucide-react'; // Add the icons
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import OrderDetailsModal from '../components/OrderDetailsModal';
import { Link } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, [location]);

  useEffect(() => {
    // Fetch orders from the backend
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://192.168.1.33:5000/api/order/orders');
        const data = await response.json();
        console.log('Orders:', data);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Clock className="h-6 w-6 mr-2 text-yellow-800 dark:text-yellow-300" />;
      case 'confirmed':
        return <Check className="h-6 w-6 mr-2 text-green-800 dark:text-green-300" />;
      case 'in-transit':
        return <Truck className="h-6 w-6 mr-2 text-blue-800 dark:text-blue-300" />;
      default:
        return null;
    }
  };



  if (loading) {
    return <div className="text-center"><Spinner/></div>;
  }

  return (
    <section className="bg-headerBackGround font-forumNormal py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 dark:text-white sm:text-2xl">My Orders</h2>
          <hr className="border-gray-300 dark:border-gray-700" />
          <div className="mt-6 flow-root sm:mt-8">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {orders.map((order) => (
                <div key={order._id} className="flex flex-wrap items-center gap-y-4 py-6">
                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Order ID:</dt>
                    <dd className="w-32 md:w-32 mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                      <p className="w-32 md:w-32 truncate">#{order._id}</p>
                    </dd>
                  </dl>
                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Created Date:</dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </dd>
                  </dl>
                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Total:</dt>
                    <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                      ₹{order.orderSummary.total.toFixed(2)}
                    </dd>
                  </dl>
                  <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                    <dt className="text-base font-medium text-gray-500 dark:text-gray-400">Status:</dt>
                    <dd className={`mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${getStatusIcon(order.status)}`}>
                      {getStatusIcon(order.status)} 
                      {order.status}
                    </dd>
                  </dl>
                  <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 lg:w-auto">
                    {order.status.toLowerCase() !== 'confirmed' && (
                      <Link to={`/product-details/${order.orderSummary.items[0].product}`}>
                        <button
                          type="button"
                          className="inline-flex bg-gray-600 w-full items-center justify-center gap-2 rounded-lg border border-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white"
                        >
                          <RotateCw className="h-4 w-4 text-white" />
                          <span>Buy Again</span>
                        </button>
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setSelectedOrderId(order._id);
                        setIsModalOpen(true);
                      }}
                      type="button"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <OrderDetailsModal orderId={selectedOrderId} open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
};

export default OrderHistory;
