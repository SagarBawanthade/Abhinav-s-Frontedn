import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const deals = [
  {
    id: 1,
    image: '/images/1.png',
    title: 'Spiritual Drop',
    description: 'Comming Soon',
    buttonText: 'Shop Now',
    link: "/product-details/678d2347f3e7241bb4749290"
  },
  {
    id: 2,
    image: '/images/2.jpg',
    title: 'New Arrivals',
    // description: 'Comming Soon',
    buttonText: 'Comming Soon',
    link: '/'
  },
  {
    id: 3,
    image: '/images/3.jpg',
    title: 'Shoulder T-Shirt Drop',
    buttonText: 'Get Product',
    link: '/product-details/678be725f3e7241bb474808c'
  }
];

const ShoppingCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % deals.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % deals.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + deals.length) % deals.length);
  };

  const handleDealNavigation = () => {
    navigate(deals[currentSlide].link);
  };

  return (
    <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[80vh] overflow-hidden group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { 
              duration: 0.6,
              ease: "easeInOut"
            }
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.95,
            transition: { 
              duration: 0.6,
              ease: "easeInOut"
            }
          }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-black/40 z-10"></div>
            <img 
              src={deals[currentSlide].image}
              alt={deals[currentSlide].title}
              className="w-full h-full object-cover brightness-90 transition-all duration-700"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-12 z-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    delay: 0.3, 
                    duration: 0.6,
                    ease: "easeOut"
                  }
                }}
                className="text-center text-white"
              >
                <h3 className="text-xl sm:text-2xl md:text-4xl font-bold mb-2 sm:mb-3 tracking-wide">
                  {deals[currentSlide].title}
                </h3>
                <p className="text-sm sm:text-base md:text-2xl mb-3 sm:mb-5 font-light opacity-90">
                  {deals[currentSlide].description}
                </p>
                <button 
                  onClick={handleDealNavigation}
                  className="px-4 py-2 mb-4 md:mb-0 sm:px-6 sm:py-3 bg-white text-black rounded-full 
                  hover:bg-gray-100 transition duration-300 transform hover:scale-105 
                  active:scale-95 text-xs sm:text-sm md:text-base font-semibold tracking-wider"
                >
                  {deals[currentSlide].buttonText}
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 
          bg-white/20 hover:bg-white/40 backdrop-blur-sm 
          rounded-full p-1 sm:p-2 z-30 opacity-70 sm:opacity-0 group-hover:opacity-100 
          transition-all duration-300"
      >
        <ChevronLeft className="text-white" size={16} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 
          bg-white/20 hover:bg-white/40 backdrop-blur-sm 
          rounded-full p-1 sm:p-2 z-30 opacity-70 sm:opacity-0 group-hover:opacity-100 
          transition-all duration-300"
      >
        <ChevronRight className="text-white" size={16} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2 z-30">
        {deals.map((_, index) => (
          <motion.div
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/80'
            }`}
            initial={{ scale: 1 }}
            animate={{ 
              scale: index === currentSlide ? 1.25 : 1,
              transition: { duration: 0.3 }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ShoppingCarousel;