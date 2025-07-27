import React from "react";
import { Star } from "lucide-react";

const ProductCard = ({ product, onProductClick }) => {
  return (
    <div 
      onClick={() => onProductClick(product)}
      className="group font-forumNormal ml-0.5 mr-0.5 bg-headerBackground rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 hover:scale-[1.02] overflow-hidden border border-gray-100"
    >
      <div className="relative overflow-hidden">
        <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative">
          <img
            src={product.images[0]}  // Use first image of the array here
            alt={product.name}
            className="w-full h-full object-cover rounded-2xl shadow-lg"
            onError={(e) => {
              e.target.src = "/images/placeholder.jpg"; // Fallback image
            }}
          />
          
          {/* DIGITAL PRINT & POPULAR BADGES: Only on non-mobile */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 hidden sm:flex">
            <span className="font-forumNormal bg-black text-white px-3 py-1 rounded-full text-xs font-semibold">
              DIGITAL PRINT
            </span>
            {product.isPopular && (
              <span className="font-forumNormal bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                POPULAR
              </span>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs font-medium">{product.rating}</span>
            </div>
          </div>
        </div>

        <div className="p-4">
          {/* Brand Name: Only on non-mobile */}
          <div className="mb-2 hidden sm:block">
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              {product.brand}
            </span>
          </div>

          <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-black transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                ₹{product.discountedPrice}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            </div>
            <span className="bg-green-100 text-green-800 py-1 rounded text-xs font-semibold">
              {product.discount}% OFF
            </span>
          </div>

          {/* Product Type & Reviews: Only on non-mobile */}
          <div className="flex items-center justify-between text-xs text-gray-500 hidden sm:flex">
           
            <span>{product.reviews} reviews</span>
          </div>

          {/* Colors: Only on non-mobile */}
          <div className="flex gap-1 mt-2 hidden sm:flex">
            {product.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
                title={`Color option ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
