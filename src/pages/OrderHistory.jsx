import  { useEffect, useState } from 'react';
import { Eye, RotateCw, Check, Clock, Truck } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import OrderDetailsModal from '../components/OrderDetailsModal';


const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://backend.abhinavsofficial.com/api/order/orders');
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusStyles = (status) => {
    const baseStyles = "flex items-center px-3 py-1 rounded-full text-sm font-medium";
    switch (status.toLowerCase()) {
      case 'pending':
        return `${baseStyles} bg-yellow-100 text-yellow-800`;
      case 'delivered':
        return `${baseStyles} bg-green-100 text-green-800`;
      case 'in transit':
        return `${baseStyles} bg-blue-100 text-blue-800`;
      default:
        return `${baseStyles} bg-gray-100 text-gray-800`;
    }
  };

  const getStatusIcon = (status) => {
    const iconClass = "h-4 w-4 mr-2";
    switch (status.toLowerCase()) {
      case 'pending':
        return <Clock className={iconClass} />;
      case 'delivered':
        return <Check className={iconClass} />;
      case 'in transit':
        return <Truck className={iconClass} />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 rounded-full animate-spin border-t-blue-500" />
      </div>
    );
  }



  

  return (
    <div className="min-h-screen bg-headerBackGround py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-forumNormal text-gray-900 mb-8">Order History</h1>
        
        <div className="space-y-4">
          {orders.map((order) => (
            <div 
              key={order._id}
              className="bg-headerBackGround  rounded-lg shadow-sm border border-gray-250 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div>
                    <div className="text-sm text-gray-500">Order ID</div>
                    <div className="mt-1 font-medium text-gray-900 truncate">
                      #{order._id}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Date</div>
                    <div className="mt-1 font-medium text-gray-900">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Total Amount</div>
                    <div className="mt-1 font-medium text-gray-900">
                      ₹{order.orderSummary.total.toFixed(2)}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-gray-500">Status</div>
                    <div className="mt-1">
                      <span className={getStatusStyles(order.status)}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-gray-250">
                  {order.status.toLowerCase() !== 'confirmed' && (
                    <Link 
                      to={`/product-details/${order.orderSummary.items[0].product}`}
                      className="flex-1"
                    >
                      <button className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2">
                        <RotateCw className="h-4 w-4" />
                        Buy Again
                      </button>
                    </Link>
                  )}
                  
                  <button
                    onClick={() => {
                      setSelectedOrderId(order._id);
                      setIsModalOpen(true);
                    }}
                    className="flex-1 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Eye className="h-4 w-4" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <OrderDetailsModal 
        orderId={selectedOrderId} 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </div>
  );
};

export default OrderHistory;