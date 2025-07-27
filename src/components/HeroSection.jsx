// components/HeroSection.jsx
import React from "react";
import { Sparkles, Star, Heart } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-[#0c3937] via-[#0c3937] to-[#0c3937] text-white py-12 sm:py-16 md:py-20 px-4">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c3937] to-[#0c3937]"></div>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-300 rounded-full animate-pulse"></div>
        </div>
      </div>
      
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full mb-4 sm:mb-6 border border-white/30">
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-300" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
          Create Your Dream Style
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed px-4">
          Turn your imagination into wearable art ✨
        </p>
        
        <div className="flex items-center justify-center mt-6 space-x-6 text-sm sm:text-base">
          <div className="flex items-center">
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 mr-2" />
            <span>Premium Quality</span>
          </div>
          <div className="flex items-center">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-pink-300 mr-2" />
            <span>Made with Love</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;