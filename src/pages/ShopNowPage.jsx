import { Link } from "react-router-dom";

const ShopNowPage = () => {
    return (
      <div className="flex flex-col md:flex-row items-center text-center bg-headerBackGround">
        {/* Left Section - Hoodie Image */}
        <div className="w-full md:w-1/2">
          <img
            src="/images/shoplogo.jpg"
            alt="Hoodie"
            className="w-full h-auto object-cover"
          />
        </div>
  
        {/* Right Section - Text and Button */}
        <div className="w-full r md:w-1/2 px-6 py-8 md:py-0 md:pl-12 flex flex-col  justify-center">
          <h4 className="forum-regular text-center text-3xl md:text-5xl md:text-center font-bold text-gray-800 mb-4">
            Unleash Your Style
          </h4>
          <p className="text-lg font-avenir text-gray-600 mb-6">
            Discover the best in fashion online. Shop now to elevate your wardrobe.
          </p>
          <Link to="/shop" className="bg-homePage text-white px-8 py-4 w-30 rounded-full text-2xl shadow-md hover:bg-gray-700 transition">
            Shop Now
          </Link>
        </div>
      </div>
    );
  };
  
  export default ShopNowPage;
  