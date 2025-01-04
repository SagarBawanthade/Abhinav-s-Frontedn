import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { CheckCircle, ShoppingBag, ArrowRight, Package } from "lucide-react";

const OrderConfirmationPage = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    setShow(true);
  }, [location]);

  return (
    <div className="min-h-screen bg-headerBackGround flex items-center justify-center p-4">
      <div className={`max-w-lg w-full text-center transition-all duration-700 transform ${show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* Success Animation */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-green-100 duration-1000" />
          <div className="relative">
            <CheckCircle className="w-24 h-24 mx-auto text-green-500 animate-bounce" />
          </div>
        </div>

        {/* Order Success Message */}
        <div className={`space-y-4 transition-all delay-300 duration-700 ${show ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
          <h1 className="text-4xl font-bold text-gray-800">
            Order Confirmed!
          </h1>
          
          <div className="flex justify-center items-center gap-2 text-gray-600">
            <Package className="w-5 h-5" />
            <p className="text-lg">Your package is on its way!</p>
          </div>

          <p className="text-gray-500 max-w-md mx-auto">
            We'll send you shipping confirmation and tracking details to your email shortly.
          </p>
        </div>

        {/* Animated Divider */}
        <div className="my-10 flex justify-center items-center gap-2">
          <div className={`h-0.5 w-16 bg-gray-200 transition-all delay-500 duration-700 ${show ? 'w-16 opacity-100' : 'w-0 opacity-0'}`} />
          <ShoppingBag className="w-6 h-6 text-gray-400" />
          <div className={`h-0.5 w-16 bg-gray-200 transition-all delay-500 duration-700 ${show ? 'w-16 opacity-100' : 'w-0 opacity-0'}`} />
        </div>

        {/* Action Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all delay-700 duration-700 ${show ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'}`}>
          <Link
            to="/shop"
            className="group flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-500 transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          
          <Link
            to="/order-history"
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-full hover:border-gray-300 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105"
          >
            <Package className="w-5 h-5" />
            <span>Track Order</span>
          </Link>
        </div>

        {/* Celebration Confetti Effect */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          {show && Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-5%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
                backgroundColor: ['#FCD34D', '#60A5FA', '#34D399', '#F87171'][Math.floor(Math.random() * 4)],
                width: '8px',
                height: '8px',
                borderRadius: '50%',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
        .animate-confetti {
          animation: confetti linear infinite;
        }
      `}</style>
    </div>
  );
};

export default OrderConfirmationPage;