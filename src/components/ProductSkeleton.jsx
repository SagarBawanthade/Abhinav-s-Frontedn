import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="forum-regular bg-[#E9EBCA] min-h-screen py-10">
      {/* Heading Skeleton */}
      <div className="text-center mt-10 mb-10">
        <div className="ml-4">
          <div className="h-16 w-64 bg-gray-200 animate-pulse rounded-lg"></div>
        </div>
      </div>

      <hr className="border-t mt-5 mb-10 border-gray-200 w-full" />

      {/* Category Header Skeleton */}
      <div className="px-6">
        <div className="max-w-8xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-200 animate-pulse rounded-full"></div>
              <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          </div>

          {/* Product Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-sm p-4">
                {/* Image Skeleton */}
                <div className="aspect-square rounded-xl bg-gray-200 animate-pulse mb-4"></div>
                
                {/* Title Skeleton */}
                <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4 mb-4"></div>
                
                {/* Price Skeleton */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="h-6 w-20 bg-gray-200 animate-pulse rounded"></div>
                    <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                  </div>
                  <div className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                </div>
                
                {/* Button Skeleton */}
                <div className="h-12 bg-gray-200 animate-pulse rounded-lg w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;