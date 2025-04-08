import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PromotionalOffer from '../components/PromotionalOffer';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const HomepageCarousel = () => {
  const [loadedImages, setLoadedImages] = useState({});
  const [offerVisible, setOfferVisible] = useState(true);

  const products = [
  
    { image: '/images/13.jpg', link: '/' },
    { image: '/images/rushabh.jpg', link: '/' },
    { image: '/images/14.jpg', link: '/' },
    { image: '/images/15.jpg', link: '/' },
    { image: '/images/2.jpg', link: '/' },
    { image: '/images/3.jpg', link: '/' },
    { image: '/images/4.jpg', link: '/' },
    { image: '/images/5.jpg', link: '/' },
    { image: '/images/6.jpg', link: '/' },
    { image: '/images/7.jpg', link: '/' },
    { image: '/images/8.jpg', link: '/' },
    { image: '/images/9.jpg', link: '/' },
    { image: '/images/10.jpg', link: '/' },
  ];

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({
      ...prev,
      [index]: true
    }));
  };

  const handleCloseOffer = () => {
    setOfferVisible(false);
  };

  return (
    <> 

 <AnimatePresence>
         {offerVisible && <PromotionalOffer onClose={handleCloseOffer} />}
      </AnimatePresence>
    
   
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