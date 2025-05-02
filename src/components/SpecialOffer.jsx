import { useState, useEffect } from "react";
import { Timer, Tag, ShoppingBag } from "lucide-react";

const SpecialOffer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  const categories = ["Tshirt", "Oversize-Tshirt"]; // Array of categories

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return { hours: prevTime.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-6 space-y-4">
      {/* Main Offer Box */}
      <div className="bg-headerBackGround rounded-lg p-4 shadow-md border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-800">Special Offer</h3>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Timer className="w-5 h-5 animate-pulse text-red-500" />
            <span className="font-mono text-sm">
              {String(timeLeft.hours).padStart(2, "0")}:
              {String(timeLeft.minutes).padStart(2, "0")}:
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Offer Details */}
        <div className="space-y-3">
          {categories.includes("Tshirt") && (
            <div className="flex items-center space-x-2 bg-headerBackGround p-3 rounded-md border border-gray-200 transition-transform hover:scale-102">
              <ShoppingBag className="w-5 h-5 text-green-500" />
              <p className="text-gray-700 font-medium">
                Add any 2 T-shirts to cart for just ₹999
              </p>
            </div>
          )}
          {categories.includes("Oversize-Tshirt") && (
            <div className="flex items-center space-x-2 bg-headerBackGround p-3 rounded-md border border-gray-200 transition-transform hover:scale-102">
              <ShoppingBag className="w-5 h-5 text-green-500" />
              <p className="text-gray-700 font-medium">
                Add any 2 Oversized-Tshirts to cart for just ₹999
              </p>
            </div>
          )}

          {/* Additional Offer Details */}
          <div className="text-sm text-gray-600 space-y-2 pl-2">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              <p>Mix and match from our entire collection</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              <p>Limited time offer - Ends soon!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-sm text-white p-3 rounded-lg text-center relative overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          {categories.includes("Tshirt") && (
            <span className="inline-block">⚡ 2 T-Shirts @ ₹999</span>
          )}
          {categories.includes("Oversize-Tshirt") && (
            <span className="inline-block ">⚡ 2 Oversized T-Shirts @ ₹999</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpecialOffer;
