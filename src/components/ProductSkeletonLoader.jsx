import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';


const ProductSkeletonLoader = () => {
  return (
    <div className="w-full bg-headerBackGround px-4 py-8">
      {/* Header Skeleton */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-lg mb-6" />
        <div className="h-1 w-full bg-gray-100" />
      </div>

      {/* Products Grid Skeleton */}
      <div className="max-w-7xl mx-auto">
        <Swiper
          className="w-full"
          slidesPerView={1.2}
          spaceBetween={16}
          breakpoints={{
            640: { slidesPerView: 2.2 },
            768: { slidesPerView: 3.2 },
            1024: { slidesPerView: 4.2 }
          }}
        >
          {[1, 2, 3, 4, 5].map((index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                {/* Image Skeleton */}
                <div className="aspect-square bg-gray-200 animate-pulse">
                  <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
                </div>

                {/* Content Container */}
                <div className="p-4 space-y-4">
                  {/* Title Skeleton */}
                  <div className="h-5 bg-gray-200 rounded-md w-3/4 animate-pulse" />

                  {/* Price Skeleton */}
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-200 rounded-md w-1/3 animate-pulse" />
                    <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductSkeletonLoader;