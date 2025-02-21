import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const HomepageCarousel = () => {
  const [loadedImages, setLoadedImages] = useState({});

  const products = [
    { image: '/images/abhinav1.jpg', link: '/' },
    { image: '/images/vivek1.jpg', link: '/' },
    { image: '/images/collection1.jpg', link: '/' },
    { image: '/images/collection2.png', link: '/' },
    { image: '/images/collection3.png', link: '/product-details/678beffdf3e7241bb47480c7' },
    { image: '/images/collection4.png', link: '/' },
    { image: '/images/tshirt-collection.jpg', link: '/product-details/6795df48e32e6373237a7d67' },
    { image: '/images/tshirt-collection2.jpg', link: '/product-details/6795dffce32e6373237a7d75' },
    { image: '/images/tshirt-collection3.jpg', link: '/product-details/6795dffce32e6373237a7d75' },
  ];

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({
      ...prev,
      [index]: true
    }));
  };

  return (
    <>
   
    <Swiper
      modules={[Autoplay, Navigation]}
      spaceBetween={10}
      slidesPerView={2.5}
      speed={1000}
      autoplay={{
        delay: 4500,
        disableOnInteraction: false,
      }}
      loop={true}
      navigation={false}
      className="w-full bg-headerBackGround"
    >
      {products.map((product, index) => (
        <SwiperSlide key={index} className="aspect-square">
          <a href={product.link} className="block w-full h-full relative">
            <AnimatePresence>
              {!loadedImages[index] && (
                <motion.div 
                  className="absolute inset-0 bg-gray-200 animate-pulse"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
            <motion.img
              src={product.image}
              alt={`Product ${index + 1}`}
              onLoad={() => handleImageLoad(index)}
              className="h-[90%] object-cover transition-transform"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ 
                opacity: loadedImages[index] ? 1 : 0,
                scale: loadedImages[index] ? 1 : 0.95
              }}
              transition={{ 
                opacity: { duration: 0.5 },
                scale: { duration: 0.5 }
              }}
            />
          </a>
        </SwiperSlide>
      ))}
    </Swiper></>
  );
};

export default HomepageCarousel;