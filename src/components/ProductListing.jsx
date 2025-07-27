// components/ProductListing.jsx
import React, { useState } from "react";
import { Search } from "lucide-react";
import HeroSection from "./HeroSection";
import ProductCard from "./ProductCard";
import { tshirtProducts } from "../data/tshirtData";

const ProductListing = ({ onProductClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = tshirtProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.gender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="forum-regular min-h-screen bg-gray-50">
      <HeroSection />
      
      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        

        {/* Product Stats */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            <span className="font-medium text-gray-900">{filteredProducts.length}</span> products found
            {searchTerm && (
              <span className="ml-2">
                for "<span className="font-medium text-[#0c3937]">{searchTerm}</span>"
              </span>
            )}
          </div>
          
          <div className="text-sm text-gray-500">
            Showing all available t-shirts
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onProductClick={onProductClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">
              Try searching with different keywords or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;