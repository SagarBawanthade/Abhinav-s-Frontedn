import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ShoppingBag } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCreative, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';

const ShopNowPage = () => {
  const location = useLocation();
  const { scrollY } = useScroll();
  
  // Parallax effect for background
  const backgroundY = useTransform(scrollY, [0, 500], [0, 100]);
  
  const images = [
    "/images/shop1.jpeg",
    "/images/abhinav1.jpeg",
    "/images/new1.jpeg",
    "/images/new2.jpeg",
     "/images/21.jpeg",
      "/images/22.jpeg",
       "/images/23.jpeg",
        "/images/24.jpeg",
    // "/images/11.jpg"
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    if (location.pathname !== "/shop") {
      sessionStorage.clear();
    }   
  }, [location]);

  return (
    <section className=" bg-[#f8f8f8] relative overflow-hidden">
      {/* Animated Background Pattern */}
      <motion.div 
        className="absolute inset-0 bg-grid-pattern opacity-5"
        style={{ y: backgroundY }}
      />

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-24 rounded-full bg-gray-900/5"
            initial={{ 
              x: Math.random() * 100,
              y: Math.random() * 100,
              scale: 0.8
            }}
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-8 py-8 lg:py-16">
          {/* Left Section - Swiper Image */}
          
         <motion.div
         className="w-full lg:w-1/2 h-auto"
         initial={{ opacity: 0, x: -20 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.8 }}
       >
            <div className="relative group">
              <Swiper
                modules={[Autoplay, EffectCreative, Pagination]}
                spaceBetween={10}
                slidesPerView={1}
                speed={1000}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  el: '.swiper-pagination',
                  clickable: true,
                  renderBullet: (index, className) => {
                    return `<span class="${className} bg-gray-800 text-center opacity-50 hover:opacity-100"></span>`;
                  }
                }}
                effect="creative"
                creativeEffect={{
                  prev: { translate: ['-100%', 0, 0] },
                  next: { translate: ['100%', 0, 0] }
                }}
                loop={true}
                className="rounded-3xl shadow-xl overflow-hidden relative"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <motion.img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-auto object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                  </SwiperSlide>
                ))}
                
                {/* <div className="swiper-pagination absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20"></div> */}
              </Swiper>

              {/* Animated Decorative Elements */}
              <motion.div 
                className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gray-800 opacity-20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-gray-800 opacity-20"
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          {/* Right Section - Content */}
          <motion.div 
            className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-6 lg:gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, staggerChildren: 0.2 }}
          >
            {/* Animated Premium Badge */}
            <motion.div
              className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-yellow-500" />
              </motion.div>
              <span className="text-sm font-medium text-gray-800">Premium Collection</span>
            </motion.div>

            {/* Animated Heading */}
            <motion.div className="text-center lg:text-left">
              <motion.h4 
                className="forum-regular text-4xl sm:text-5xl lg:text-6xl text-gray-800 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Unleash Your
                <motion.span 
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  Style
                </motion.span>
              </motion.h4>
            </motion.div>

            {/* Description with Staggered Animation */}
            <motion.p 
              className="text-md font-forumNormal sm:text-xl text-gray-600 max-w-md text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Discover the best in fashion online. Shop now to elevate your wardrobe with our premium collection.
            </motion.p>

            {/* Enhanced CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/shop"
                className="group relative overflow-hidden bg-gray-900 text-white px-6 sm:px-8 py-4 rounded-full text-lg font-medium inline-flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="relative z-10">Shop Collection</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800"
                  animate={{ 
                    x: ["0%", "100%", "0%"],
                    backgroundColor: ["#1a202c", "#2d3748", "#1a202c"]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ShopNowPage;