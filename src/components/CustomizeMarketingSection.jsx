import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Star, Zap, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomizeMarketingSection = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={`font-forumNormal w-full bg-gradient-to-r from-[#0c3937] via-[#0c3937] to-[#0c3937] shadow-lg transition-all duration-500 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}>
      {/* Banner Content */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-2 left-10 w-8 h-8 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-1 right-20 w-6 h-6 bg-yellow-300/20 rounded-full animate-bounce"></div>
          <div className="absolute bottom-1 left-1/4 w-4 h-4 bg-pink-300/20 rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 right-1/3 w-5 h-5 bg-blue-300/20 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Left Content */}
            <div className="flex items-center gap-3 sm:gap-4 flex-1">
              {/* Icon + Badge */}
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
                </div>
                <div className="hidden sm:inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-2 py-1">
                  <Zap className="w-3 h-3 text-yellow-300" />
                  <span className="text-xs font-semibold text-white">NEW</span>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white truncate">
                    🎨 Create Your Custom T-Shirt Design!
                  </h3>
                  <div className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-1 text-white/90">
                      <Star className="w-3 h-3 text-yellow-300" />
                      <span className="hidden sm:inline">Premium Quality</span>
                      <span className="sm:hidden">Quality</span>
                    </div>
                    <div className="text-white/80">•</div>
                    <span className="text-white/90 font-medium">24hr Response</span>
                    <div className="hidden lg:inline text-white/80">•</div>
                    <span className="hidden lg:inline text-white/90">Free Consultation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - CTA + Close */}
            <div className="flex items-center gap-2 sm:gap-3 ml-2">
              <Link
                to="/custom-style"
                className="group text-white font-bold py-2 sm:py-2.5 px-3 sm:px-5 lg:px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-xs sm:text-sm lg:text-base whitespace-nowrap"
              >
                <span className="flex items-center gap-1 sm:gap-2">
                  <span className="hidden sm:inline">Start Designing</span>
                  <span className="sm:hidden">Design</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              {/* <button
                onClick={handleClose}
                className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors duration-200 group"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4 text-white group-hover:text-white/80" />
              </button> */}
            </div>
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400"></div>
      </div>
    </div>
  );
};

export default CustomizeMarketingSection;