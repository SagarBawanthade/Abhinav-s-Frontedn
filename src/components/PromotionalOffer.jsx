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
            <div className="text-lg font-bold">RAKHI SPECIAL🏵️📿</div>
          </div>
          
          <div className="text-sm flex flex-col sm:flex-row items-center">
          <div className="font-semibold text-base sm:text-lg mb-2 sm:mb-0 sm:mr-4 text-center flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
            
  <div className="sm:inline">
    <span className="hidden sm:inline">|</span> HOODIES: BUY ANY 3 @ ₹1599 <span className="hidden sm:inline">|</span>
  </div>
  <div className="sm:inline">
    <span className="hidden sm:inline">|</span> OVERSIZED-TSHIRTS: BUY 1 GET 1 @ ₹799 <span className="hidden sm:inline">|</span>
  </div>
  <div className="sm:inline">
    <span className="hidden sm:inline">|</span> T-SHIRTS: BUY ANY 2 @ ₹599 <span className="hidden sm:inline">|</span>
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


// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { ShoppingBag, X } from 'lucide-react';

// const PromotionalOffer = ({ onClose }) => {
//   // Calculate time remaining for the offer (24 hours from now)
//   const [endTime] = useState(() => {
//     const end = new Date();
//     end.setHours(end.getHours() + 24);
//     return end;
//   });
  
//   const [timeRemaining, setTimeRemaining] = useState({
//     hours: 47,
//     minutes: 59,
//     seconds: 59
//   });

//   // Update countdown timer
//   useEffect(() => {
//     const timer = setInterval(() => {
//       const now = new Date();
//       const diff = endTime - now;
      
//       if (diff <= 0) {
//         clearInterval(timer);
//         onClose?.();
//         return;
//       }
      
//       const hours = Math.floor(diff / (1000 * 60 * 60));
//       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
//       setTimeRemaining({ hours, minutes, seconds });
//     }, 1000);
    
//     return () => clearInterval(timer);
//   }, [endTime, onClose]);

//   const offers = [
//     { text: "T-SHIRTS: BUY 2 @ ₹899", key: "tshirt2" },
//     { text: "T-SHIRTS: BUY 3 @ ₹999", key: "tshirt3" },
//     { text: "OVERSIZED: BUY 2 @ ₹999", key: "oversized" }
//   ];

//   return (
//     <motion.div
//       initial={{ height: 0, opacity: 0 }}
//       animate={{ height: 'auto', opacity: 1 }}
//       exit={{ height: 0, opacity: 0 }}
//       className="relative bg-slate-900 text-white border-b border-slate-700"
//     >
//       <div className="max-w-7xl mx-auto px-4 py-3">
//         {/* Mobile Layout */}
//         <div className="block md:hidden">
//           <div className="flex items-center justify-between mb-2">
//             <div className="flex items-center gap-2">
//               <ShoppingBag className="w-4 h-4 text-blue-400" />
//               <span className="text-sm font-semibold tracking-wide">LIMITED OFFER</span>
//             </div>
//             <button 
//               className="text-slate-400 hover:text-white transition-colors"
//               onClick={onClose}
//               aria-label="Close offer"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
          
//           <div className="space-y-1">
//             {offers.map((offer) => (
//               <div key={offer.key} className="text-xs text-slate-200 bg-slate-800 px-2 py-1 rounded">
//                 {offer.text}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Tablet & Desktop Layout */}
//         <div className="hidden md:flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="flex items-center gap-2">
//               <ShoppingBag className="w-5 h-5 text-blue-400" />
//               <span className="font-semibold tracking-wide">LIMITED TIME OFFER</span>
//             </div>
            
//             <div className="hidden lg:block w-px h-6 bg-slate-600"></div>
            
//             <div className="flex flex-wrap items-center gap-3 lg:gap-6">
//               {offers.map((offer, index) => (
//                 <div key={offer.key} className="flex items-center gap-2">
//                   {index > 0 && <div className="hidden lg:block w-px h-4 bg-slate-600"></div>}
//                   <span className="text-sm lg:text-base font-medium whitespace-nowrap">
//                     {offer.text}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           <button 
//             className="text-slate-400 hover:text-white transition-colors ml-4"
//             onClick={onClose}
//             aria-label="Close offer"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
      
//       {/* Subtle bottom accent */}
//       <div className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
//     </motion.div>
//   );
// };

// export default PromotionalOffer;