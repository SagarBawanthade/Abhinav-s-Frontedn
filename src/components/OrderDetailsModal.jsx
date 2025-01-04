import { useState, useEffect } from 'react';
import { 
  Package, Truck, CreditCard, User, Mail, Phone, MapPin, Calendar, 
  Tag, Box, Gift, X, CheckCircle, Clock, ShoppingBag,
  CreditCard as PaymentIcon, BadgeCheck, AlertCircle
} from 'lucide-react';

export default function OrderDetailsModal({ orderId, open, onOpenChange }) {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [open]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (open && orderId) {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:5000/api/order/order/${orderId}`);
          const data = await response.json();
          setOrderDetails(data);
        } catch (error) {
          console.error('Error fetching order details:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrderDetails();
  }, [orderId, open]);

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-transit':
        return  <Truck  className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  if (!open) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black/50 z-50 flex items-center font-forumNormal justify-center p-4 transition-opacity duration-300 
        ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      onClick={() => onOpenChange(false)}
    >
      <div 
        className={`bg-white dark:bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl transition-all duration-300
          ${isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-400 px-6 py-4 flex items-center  justify-between rounded-t-xl">
          <h2 className="text-xl  font-semibold flex items-center gap-2 text-white">
            <ShoppingBag className="h-6 w-6" />
            Order Details #{orderId}
          </h2>
          <button 
            onClick={() => onOpenChange(false)}
            className="p-2 hover:bg-white/20 rounded-full transition-opacity duration-300  transition-colors text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg">
                  <div className="h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                </div>
              ))}
            </div>
          ) : orderDetails && (
            <div className="space-y-6">
              {/* Order Status and Date */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  {getStatusIcon(orderDetails.status)}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-2
                    ${orderDetails.status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' : 
                      orderDetails.status.toLowerCase() === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'}`}>
                    {orderDetails.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="h-5 w-5" />
                  <span className="text-sm">
                    {new Date(orderDetails.orderDate).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="flex items-center gap-2 font-semibold mb-4 text-gray-800 dark:text-white">
                  <Box className="h-5 w-5 text-purple-500" />
                  Order Items
                </h3>
                <div className="space-y-4">
                  {orderDetails.orderSummary.items.map((item, index) => (
                    <div 
                      key={item._id}
                      className="flex flex-col sm:flex-row gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      style={{
                        animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <img 
                        src={item.productImage[0]} 
                        alt={item.productName}
                        className="w-full sm:w-24 h-70 md:h-24 rounded-md object-cover"
                      />
                      <div className="flex-1 space-y-2">
                        <h4 className="font-medium text-gray-900 dark:text-white">{item.productName}</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <p className="flex items-center gap-1">
                            <Tag className="h-4 w-4 text-blue-500" />
                            Size: {item.size}
                          </p>
                          <p className="flex items-center gap-1">
                            <BadgeCheck className="h-4 w-4 text-green-500" />
                            Color: {item.color}
                          </p>
                          <p className="flex items-center gap-1">
                            <Package className="h-4 w-4 text-purple-500" />
                            Qty: {item.quantity}
                          </p>
                          <p className="flex items-center gap-1">
                            <PaymentIcon className="h-4 w-4 text-indigo-500" />
                            ₹{item.price}
                          </p>
                          {item.giftWrapping && (
                            <p className="flex items-center gap-1 col-span-2">
                              <Gift className="h-4 w-4 text-pink-500" />
                              Gift Wrapped
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-gradient-to-br bg-white to-purple-50 dark:from-gray-800 dark:to-gray-900 border dark:border-gray-700 rounded-lg p-6 shadow-sm">
                <h3 className="flex items-center gap-2 font-semibold mb-4 text-gray-800 dark:text-white">
                  <CreditCard className="h-5 w-5 text-indigo-500" />
                  Order Summary
                </h3>
                <div className="space-y-3">
                  {[
                    { label: 'Subtotal', value: orderDetails.orderSummary.subtotal },
                    { label: 'Shipping', value: orderDetails.orderSummary.shipping },
                    { label: 'Taxes', value: orderDetails.orderSummary.taxes }
                  ].map((item, index) => (
                    <div 
                      key={item.label}
                      className="flex justify-between text-gray-600 dark:text-gray-400"
                      style={{
                        animation: `slideIn 0.3s ease-out ${index * 0.1}s both`
                      }}
                    >
                      <span>{item.label}</span>
                      <span>₹{item.value}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-semibold pt-3 border-t border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>₹{orderDetails.orderSummary.total}</span>
                  </div>
                </div>
              </div>

              {/* Contact & Shipping Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Contact Information */}
                <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="flex items-center gap-2 font-semibold mb-4 text-gray-800 dark:text-white">
                    <User className="h-5 w-5 text-blue-500" />
                    Contact Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Mail className="h-4 w-4 text-purple-500" />
                      <span>{orderDetails.contactInformation.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Phone className="h-4 w-4 text-green-500" />
                      <span>{orderDetails.contactInformation.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="flex items-center gap-2 font-semibold mb-4 text-gray-800 dark:text-white">
                    <Truck className="h-5 w-5 text-green-500" />
                    Shipping Information
                  </h3>
                  <div className="space-y-2">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {orderDetails.shippingInformation.firstName} {orderDetails.shippingInformation.lastName}
                    </p>
                   
                    <div className="flex items-start gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="h-4 w-4 text-red-500 mt-1" />
                      <div>
                        <p>{orderDetails.shippingInformation.address}</p>
                        {orderDetails.shippingInformation.apartment && (
                          <p>{orderDetails.shippingInformation.apartment}</p>
                        )}
                        <p>
                          {orderDetails.shippingInformation.city}, {orderDetails.shippingInformation.state} {orderDetails.shippingInformation.postalCode}
                        </p>
                        <p>{orderDetails.shippingInformation.country}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="flex items-center gap-2 font-semibold mb-4 text-gray-800 dark:text-white">
                  <PaymentIcon className="h-5 w-5 text-yellow-500" />
                  Payment Information
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Payment Method: {orderDetails.paymentInformation.method}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}






