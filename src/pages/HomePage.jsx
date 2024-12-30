import Slide from "../components/Slide";
import HoodiesPage from "./HoodiesPage";
import InstagramPage from "./InstaGramPage";
import ServicesPage from "./ServicesPage";
import ShopNowPage from "./ShopNowPage";

const HomePage = () => {
  return (
    <>
  
      <section className="sm:[70vh] flex flex-col md:flex-row md:h-[70vh] items-center bg-homePage">
        {/* Left: Logo */}
        <div className="flex-1 h-full flex items-center justify-center">
          <div className="w-3/4 h-3/4 md:w-full md:h-full">
            <img 
              src="/images/logo.jpg" 
              alt="Logo" 
              className="w-full h-full object-contain mb-4 md:mb-0"
            />
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="flex-1 flex flex-col gap-3 md:gap-4 text-gray-800 px-4 text-center md:text-left hidden md:block">
          <h2 className=" forum-regular text-homePagedes text-4xl md:text-5xl lg:text-6xl leading-tight">
            Abhinav's
          </h2>
          <p className="text-lg font-forumNormal text-[#E9EBCA] md:text-2xl lg:text-xl leading-relaxed">
            At Abhinav's, we are committed to offering top-quality products and exceptional customer service. Our mission is to provide good quality products and different collection & styling for everyone at affordable value.
          </p>
        </div>
      </section>
      <Slide />
      <ShopNowPage/>
      <HoodiesPage/>
      <InstagramPage/>
      <ServicesPage/>
     
        {/* Slide Component 
      <div className="hidden md:block">
        <Slide />
      </div>*/}
    </>
  );
};

export default HomePage;
