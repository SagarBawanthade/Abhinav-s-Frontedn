import { Tag, Sparkles, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';

const ProductsHeader = ({ category, tag, filteredProducts }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const target = filteredProducts.length;
    const steps = 20;
    const stepDuration = 50;
    
    if (count !== target) {
      const increment = (target - count) / steps;
      const timer = setInterval(() => {
        setCount(current => {
          const next = current + increment;
          if ((increment > 0 && next >= target) || (increment < 0 && next <= target)) {
            clearInterval(timer);
            return target;
          }
          return next;
        });
      }, stepDuration);
      
      return () => clearInterval(timer);
    }
  }, [filteredProducts.length]);

  return (
    <div 
      className={`mb-6 transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className="relative bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
        {/* Minimal gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white rounded-2xl" />

        {/* Main content container */}
        <div className="relative">
          <div className="flex flex-row items-center justify-between gap-4">
            {/* Category Title - Always on left */}
            <div className="flex items-center group">
            <ShoppingBag className="w-5 h-5 mr-3  md:w-8 md:h-8 text-black transition-all duration-300" />
            <h1 className="font-forumNormal text-xl md:text-4xl font-medium text-gray-800 transition-colors duration-300">
  {tag 
    ? tag.charAt(0).toUpperCase() + tag.slice(1) 
    : category 
      ? category.charAt(0).toUpperCase() + category.slice(1) 
      : 'All Products'}
</h1>


              <Sparkles className="w-3 h-3 text-yellow-400 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
            </div>

            {/* Products Count - Always on right */}
            <div className="flex items-center">
              <div className="group bg-gray-50 rounded-xl px-4 py-2 transition-all duration-300 hover:bg-gray-100">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-900 transition-transform duration-300 group-hover:rotate-12" />
                  <span className="text-sm font-forumNormal font-medium text-black">
                    {Math.round(count)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {Math.round(count) === 1 ? 'item' : 'items'}
                  </span>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsHeader;