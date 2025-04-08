import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Clock } from 'lucide-react';

const PromotionalOffer = ({ onClose }) => {
  // Calculate time remaining for the offer (24 hours from now)
  const [endTime] = useState(() => {
    const end = new Date();
    end.setHours(end.getHours() + 24);
    return end;
  });
  
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 47,
    minutes: 59,
    seconds: 59
  });

  // Update countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = endTime - now;
      
      if (diff <= 0) {
        clearInterval(timer);
        onClose?.();
        return;
      }
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeRemaining({ hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [endTime, onClose]);

  return (
    <>
      {/* Desktop and Tablet Offer Banner */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="relative bg-gradient-to-r from-purple-600 to-blue-500 text-white overflow-hidden"
      >
        <div className="container mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-2 sm:mb-0">
            <ShoppingBag className="w-5 h-5" />
            <div className="text-lg font-bold">LIMITED TIME OFFER</div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center">
          <div className="font-semibold text-base sm:text-xl mb-2 sm:mb-0 sm:mr-4 text-center flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
  <div className="sm:inline">
    <span className="hidden sm:inline">|</span> T-SHIRTS: BUY ANY 2 @ ₹899 <span className="hidden sm:inline">|</span>
  </div>
  <div className="sm:inline">
    <span className="hidden sm:inline">|</span> OVERSIZED: BUY ANY 2 @ ₹999 <span className="hidden sm:inline">|</span>
  </div>
</div>

{/*             
            <div className="flex items-center space-x-1 text-yellow-200">
              <Clock className="w-4 h-4" />
              <div className="text-sm">
                Ends in: {String(timeRemaining.hours).padStart(2, '0')}:{String(timeRemaining.minutes).padStart(2, '0')}:{String(timeRemaining.seconds).padStart(2, '0')}
              </div> 
            </div> */}
          </div>
          
          {/* <button 
            className="absolute top-1 right-2 text-white opacity-70 hover:opacity-100"
            onClick={onClose}
            aria-label="Close offer"
          >
            ×
          </button> */}
        </div>
      </motion.div>

    </>
  );
};

export default PromotionalOffer;