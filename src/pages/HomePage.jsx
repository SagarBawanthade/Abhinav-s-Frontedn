import { useLocation } from "react-router-dom";
import HoodiesPage from "./HoodiesPage";
import InstagramPage from "./InstaGramPage";
import ServicesPage from "./ServicesPage";
import ShopNowPage from "./ShopNowPage";
import { useEffect } from "react";
import { motion } from "framer-motion";

const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <motion.section 
        className=" sm:h-[70vh] flex flex-col md:flex-row items-center bg-homePage overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left: Logo */}
        <motion.div 
          className="flex-1 h-full flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full max-w-sm md:max-w-none h-full">
            <motion.img
              src="/images/logo.jpg"
              alt="Logo"
              className="w-full h-full object-contain rounded-lg shadow-lg"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            />
            {/* Mobile-only overlay text */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent md:hidden rounded-b-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
             
            </motion.div>
          </div>
        </motion.div>

        {/* Right: Text Content (Desktop only) */}
        <motion.div 
          className="flex-1 flex flex-col gap-3 md:gap-4 text-gray-800 px-4 md:px-8 text-center md:text-left hidden md:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2 
            className="forum-regular text-homePagedes text-4xl md:text-5xl lg:text-6xl leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Abhinav's
          </motion.h2>
          <motion.p 
            className="text-lg font-forumNormal text-[#E9EBCA] md:text-2xl lg:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            At Abhinav's, we are committed to offering top-quality products and exceptional customer service. Our mission is to provide good quality products and different collection & styling for everyone at affordable value.
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Other Sections with Smooth Transitions */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <ShopNowPage />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <HoodiesPage />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <InstagramPage />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <ServicesPage />
      </motion.div>
    </>
  );
};

export default HomePage;