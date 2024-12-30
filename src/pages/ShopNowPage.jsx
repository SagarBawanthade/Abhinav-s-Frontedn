import { Link } from "react-router-dom";

const ShopNowPage = () => {
    return (
      <div className="flex flex-col md:flex-row items-center bg-headerBackGround">
        {/* Left Section - Hoodie Image */}
        <div className="w-full md:w-1/2">
          <img
            src="/images/shoplogo.jpg"
            alt="Hoodie"
            className="w-full h-auto object-cover"
          />
        </div>
  
        {/* Right Section - Text and Button */}
        <div className="w-full md:w-1/2 px-6 py-8 md:py-0 md:pl-12 flex flex-col items-start justify-center">
          <h4 className="forum-regular text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Unleash Your Style
          </h4>
          <p className="text-lg font-avenir text-gray-600 mb-6">
            Discover the best in fashion online. Shop now to elevate your wardrobe.
          </p>
          <Link to="/shop" className="bg-homePage text-white px-6 py-3 rounded-full text-lg shadow-md hover:bg-gray-700 transition">
            Shop Now
          </Link>
        </div>
      </div>
    );
  };
  
  export default ShopNowPage;
  