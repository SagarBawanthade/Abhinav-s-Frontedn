import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HoodiesPage = () => {
  const [cartItem, setCartItem] = useState(null);
  const [showHeading, setShowHeading] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setShowHeading(true);
  }, []);

  const addToCart = (item) => {
    setCartItem(item);
    window.history.pushState({ modalOpen: true }, "", window.location.href);
  };

  const closeModal = () => {
    setCartItem(null);
    if (window.history.state?.modalOpen) {
      window.history.back();
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (cartItem) {
        setCartItem(null);
      }
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [cartItem]);

  const items = [
    { id: 1, name: "Unisex Snowman Hoodie", price: 1499, images: ["/images/1.jpg", "/images/AWESOME 1.jpg", "/images/shoplogo.jpg"] },
    { id: 2, name: "Winter Hoodie", price: 1999, images: ["/images/AWESOME 1.jpg", "/images/shoplogo.jpg", "/images/shoplogo.jpg"] },
    { id: 3, name: "Sporty Hoodie", price: 2199, images: ["/images/shoplogo.jpg", "/images/shoplogo.jpg", "/images/shoplogo.jpg"] },
  ];

  return (
    <div className="forum-regular bg-[#E9EBCA] min-h-screen py-10">
  {/* Heading Section */}
  <div className="text-center mt-20 mb-20">
    <h1
      className={`text-7xl text-left ml-4 text-gray-800 transition-all duration-1000 ease-out transform ${
        showHeading ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      HOODIES
    </h1>
  </div>

  <hr className="border-t mt-5 mb-10 border-black w-full" />

  {/* Hoodie Items Section */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
    {items.map((item) => (
      <div key={item.id} className="overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.name}
          className="mx-auto w-96 h-96 object-cover "
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
          <p className="text-lg text-gray-600 mb-4">₹{item.price}</p>
          <button
            className="w-full bg-gray-800 text-white text-xl py-2 opacity-80 hover:opacity-100 transition-opacity duration-300"
            onClick={() => addToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Cart Modal */}
  {cartItem && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl mx-4 rounded-lg p-8 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row items-start">
          {/* Left Section - Image Carousel */}
          <div className="md:w-1/2 w-full flex justify-center relative">
          <div className="relative w-full h-96 md:h-[29rem] overflow-hidden rounded-lg md:h-[100vh]">

              {cartItem.images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute w-full h-full transition-all duration-700 ease-in-out ${
                    index === activeImageIndex ? "" : "hidden"
                  }`}
                >
                  <img
                    src={image}
                    className="w-full h-full object-cover"
                    alt={`Hoodie image ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            {/* Slider Indicators */}
            <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
              {cartItem.images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    activeImageIndex === index ? "bg-gray-800" : "bg-gray-300"
                  }`}
                  aria-current={activeImageIndex === index ? "true" : "false"}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>

            {/* Slider Controls */}
            <button
              type="button"
              className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              onClick={() =>
                setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : cartItem.images.length - 1))
              }
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60">
                <svg
                  className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              onClick={() =>
                setActiveImageIndex((prev) => (prev < cartItem.images.length - 1 ? prev + 1 : 0))
              }
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60">
                <svg
                  className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>

          {/* Right Section - Details */}
          <div className="md:w-1/2 w-full mt-6 md:mt-0 md:ml-8">
            <h2 className="text-2xl font-bold text-gray-800">{cartItem.name}</h2>
            <p className="text-lg text-gray-600 mt-4 mb-6">₹{cartItem.price}</p>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-gray-800 text-lg mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                className="w-20 border border-gray-900 rounded-md p-2"
                defaultValue="1"
              />
            </div>

            {/* Size Dropdown */}
            <div className="mb-6">
              <label className="block text-gray-800 text-lg mb-2">Size</label>
              <select className="w-full border-gray-300 border p-2 text-lg">
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
                <option value="xl">XL</option>
              </select>
            </div>

            {/* Color Dropdown */}
            <div className="mb-6">
              <label className="block text-gray-800 text-lg mb-2">Color</label>
              <select className="w-full border-gray-300 border p-2 text-lg">
                <option value="black">Black</option>
                <option value="white">White</option>
                <option value="blue">Blue</option>
                <option value="red">Red</option>
              </select>
            </div>

            {/* Add to Cart Button */}
            <Link to="/cart">
            <button className="w-full font-bold bg-[#E6FF87] text-black font-forumNormal text-lg py-3 mt-4 rounded-md hover:bg-[#cdff18] transition">
              Add to Cart
            </button></Link>
          </div>
        </div>
      </div>
    </div>
  )}
</div>
  );
};

export default HoodiesPage;

