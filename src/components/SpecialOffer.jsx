import { useState, useEffect } from "react";
import { Timer, Tag, ShoppingBag } from "lucide-react";

const SpecialOffer = ({ productCategory, productPrice }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

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

  // Function to get relevant offers based on category and price
  const getRelevantOffers = () => {
    const offers = [];

    // OVERSIZED T-SHIRT offers
    if (productCategory === "Oversize-Tshirt" && productPrice === 799) {
      offers.push({
        id: 1,
        text: "OVERSIZED T-SHIRT: BUY 1 GET 1 @ ₹799",
        description: "Add 2 Oversized T-shirts to cart for just ₹799"
      });
    }

    // T-SHIRT offers based on price
    if (productCategory === "Tshirt") {
      if (productPrice === 249) {
        offers.push({
          id: 2,
          text: "T-SHIRTS: BUY ANY 5 @ ₹999",
          description: "Add any 5 T-shirts to cart for just ₹999 "
        });
      }
      
      if (productPrice === 399) {
        offers.push({
          id: 3,
          text: "T-SHIRTS: BUY ANY 3 @ ₹799",
          description: "Add any 3 T-shirts to cart for just ₹799 "
        });
      }
      
      if (productPrice === 599) {
        offers.push({
          id: 4,
          text: "T-SHIRTS: BUY ANY 2 @ ₹599",
          description: "Add any 2 T-shirts to cart for just ₹599"
        });
      }
    }

    return offers;
  };

  const relevantOffers = getRelevantOffers();

  // Don't show the component if no relevant offers
  if (relevantOffers.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 space-y-4">
      {/* Main Offer Box */}
      <div className="bg-headerBackGround rounded-lg p-4 shadow-md border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5 text-red-500" />
            <h3 className="text-lg font-semibold text-gray-800">Special Rakshabandhan Offer</h3>
          </div>
          {/* <div className="flex items-center space-x-2 text-gray-600">
            <Timer className="w-5 h-5 animate-pulse text-red-500" />
            <span className="font-mono text-sm">
              {String(timeLeft.hours).padStart(2, "0")}:
              {String(timeLeft.minutes).padStart(2, "0")}:
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div> */}
        </div>

        {/* Dynamic Offer Details */}
        <div className="space-y-3">
          {relevantOffers.map((offer) => (
            <div 
              key={offer.id}
              className="flex items-center space-x-2 bg-headerBackGround p-3 rounded-md border border-gray-200 transition-transform hover:scale-102"
            >
              <ShoppingBag className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-gray-700 font-medium">{offer.description}</p>
                <p className="text-sm text-gray-600 mt-1">{offer.text}</p>
              </div>
            </div>
          ))}

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
    </div>
  );
};

export default SpecialOffer;
