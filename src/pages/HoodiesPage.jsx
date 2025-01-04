import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react"; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "swiper/css";
import "swiper/css/pagination";
import { Heart, ShoppingCart, TrendingUp, Stars } from 'lucide-react';
import { addToWishlist, removeFromWishlist } from "../feature/wishlistSlice";

const HoodiesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartItem, setCartItem] = useState(null);
  const [showHeading, setShowHeading] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [products2, setProducts2] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cartLoading, setCartLoading] = useState(false);
  const [giftWrapping, setGiftWrapping] = useState(false);


  const userId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const wishlist = useSelector(state => state.wishlist.items);
 

 
const isProductInWishlist = (productId) => {
  return wishlist.some(item => item._id === productId);
};

// Modify your toggleLike function:
const toggleLike = (item) => {
  if (isProductInWishlist(item._id)) {
    dispatch(removeFromWishlist(item._id));
    toast.success("Product removed from Wishlist!");
  } else {
    dispatch(addToWishlist(item));
    toast.success("Product Added to Wishlist!");
  }
};

  
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  
  useEffect(() => {
    fetch("http://192.168.1.33:5000/api/product/getproducts")
      .then((response) => response.json())
      .then((data) => {
      setProducts2(data.slice(28,32));
        // Assuming the API response contains an array of products
        setProducts(data.slice(2, 5)); // Displaying only the first 3 products
      })
      .catch((error) => console.error("Error fetching products:", error));
    
    setShowHeading(true);
  }, []);

  const addToCart = async () => {
    if (!userId) {
      toast.error("Please login to add products to cart!");
      
      return;
    }
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color before adding to cart!");
      return;
    }

    const cartData = {
      productId: cartItem._id,
      quantity,
      color: selectedColor,
      size: selectedSize,
      giftWrapping: giftWrapping,
    };

    console.log(cartData)

    try {
      setCartLoading(true);

      const response = await fetch("http://192.168.1.33:5000/api/cart/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, ...cartData }),
      });

      const data = await response.json();
      if (data.cart) {
        navigate("/cart");
      
       
       
        toast.success("Product added to Cart Successfully!");
       
      } else {
        throw new Error(data.message || "Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart.");
    } finally {
      setCartLoading(false);
    }
  




   
    
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

  const handlecart = (item) => {
    setCartItem(item);
    console.log(item)
    window.history.pushState({ modalOpen: true }, "", window.location.href);
  };

  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, [location]);
  

  return (
    <div className="forum-regular bg-[#E9EBCA] min-h-screen py-10">
  {/* Heading Section */}
  <div className="text-center mt-20 mb-20">
    <h1
      className={`text-7xl text-left ml-4 text-gray-800 transition-all duration-1000 ease-out transform ${
        showHeading ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      Hoodies
    </h1>
  </div>

  <hr className="border-t mt-5 mb-10 border-black w-full" />

  <div className="bg-[#E9EBCA] px-6 py-8">
  <div className="max-w-8xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-gray-700" />
            <h2 className="text-2xl md:text-3xl font-semibold font-forumNormal text-gray-800">
              { "Hoodies"}
            </h2>
          </div>
          <span className="text-sm md:text-base font-forumNormal text-gray-600 flex items-center">
            <Stars className="w-4 h-4 mr-2 text-black" />
            Showing {products2.length} items
          </span>
        </div>

        <Swiper
          className="sm:block lg:hidden"
          slidesPerView="auto"
          spaceBetween={16}
          grabCursor={true}
          onSlideChange={handleSlideChange}
          scrollbar={{ draggable: true }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {products2.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="group relative bg-[#E9EBCA] rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <Link to={`/product-details/${item._id}`}>
                    <div className="aspect-square overflow-hidden rounded-t-xl">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover  transition-transform duration-500"
                      />
                    </div>
                  </Link>

                  <button
                  
                    onClick={() => toggleLike(item)}
                    className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
                  >
                     <Heart
    className={`w-5 h-5 ${
      isProductInWishlist(item._id) ? 'text-red-500 fill-red-500' : 'text-gray-600'
    } transition-colors`}
  />
                  </button>

                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-gray-900/80 text-white backdrop-blur-sm">
                      Premium
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-forumNormal text-lg text-gray-800 mb-2 truncate group-hover:text-gray-900">
                    {item.name}
                  </h3>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-xl font-semibold text-gray-900">
                        ₹{item.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{(item.price * 1.2).toFixed(0)}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-green-600">
                      20% OFF
                    </span>
                  </div>

                  <button
                    onClick={() => handlecart(item)}
                    className="w-full bg-gray-900 text-white rounded-lg py-3 flex items-center justify-center space-x-2 hover:bg-gray-800 transform transition-all duration-300 "
                  >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                    <span className="text-xl font-medium">Add to Cart</span>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center gap-2 md:hidden mt-6">
          {products2.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 transform ${
                activeIndex === index 
                  ? 'bg-gray-800 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      </div>



  



{/* Hoodie Items Section */}
<div className="bg-[#E9EBCA] px-6 py-8">
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-6 h-6 text-gray-700" />
            <h2 className="text-2xl md:text-3xl font-semibold font-forumNormal text-gray-800">
              {products[2]?.category || "Category"}
            </h2>
          </div>
          <span className="text-sm md:text-base font-forumNormal text-gray-600 flex items-center">
            <Stars className="w-4 h-4 mr-2 text-black" />
            Showing {products.length} items
          </span>
        </div>

        <Swiper
          className="sm:block lg:hidden"
          slidesPerView="auto"
          spaceBetween={16}
          grabCursor={true}
          onSlideChange={handleSlideChange}
          scrollbar={{ draggable: true }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
        >
          {products.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="group relative bg-[#E9EBCA] rounded-xl shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <Link to={`/product-details/${item._id}`}>
                    <div className="aspect-square overflow-hidden rounded-t-xl">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover  transition-transform duration-500"
                      />
                    </div>
                  </Link>

                  <button
                    onClick={() => toggleLike(item)}
                    className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-gray-100 transition-all duration-300 transform hover:scale-110"
                  >
                   
                      <Heart
    className={`w-5 h-5 ${
      isProductInWishlist(item._id) ? 'text-red-500 fill-red-500' : 'text-gray-600'
    } transition-colors`}
  />
                  </button>

                  <div className="absolute top-2 left-2">
                    <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full bg-gray-900/80 text-white backdrop-blur-sm">
                      Premium
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-forumNormal text-lg text-gray-800 mb-2 truncate group-hover:text-gray-900">
                    {item.name}
                  </h3>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-xl font-semibold text-gray-900">
                        ₹{item.price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{(item.price * 1.2).toFixed(0)}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-green-600">
                      20% OFF
                    </span>
                  </div>

                  <button
                    onClick={() => handlecart(item)}
                    className="w-full bg-gray-900 text-white rounded-lg py-3 flex items-center justify-center space-x-2 hover:bg-gray-800 transform transition-all duration-300 "
                  >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                    <span className="text-xl font-medium">Add to Cart</span>
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center gap-2 md:hidden mt-6">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 transform ${
                activeIndex === index 
                  ? 'bg-gray-800 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
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
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </div>

            {/* Size Dropdown */}
                        {/* Size Section with Radio Buttons */}
<div className="mt-6 mb-6">
  <h3 className="text-lg font-semibold mb-2">Size:</h3>
  <div className="flex gap-4">
    {cartItem.size.map((size) => (
      <label key={size} className="flex items-center">
        <input 
          type="radio" 
          name="size" 
          value={size}
          className="hidden" 
          onChange={() => setSelectedSize(size)}
        />
        <span 
          className={`w-10 h-10 flex items-center justify-center rounded-full border text-gray-800 cursor-pointer hover:bg-gray-500 hover:text-white transition duration-300 
          ${selectedSize === size ? "bg-gray-500 text-white border-gray-500" : "bg-white border-gray-400"}`}
        >
          {size}
        </span>
      </label>
    ))}
  </div>
  </div>
            {/* Color Dropdown */}
            <div className="mb-6">
              <label className="block text-gray-800 text-lg mb-2">Color</label>
              <select 
               value={selectedColor}
               onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full border-gray-300 border p-2 text-lg">
                <option value="black">Select Color</option>
                 
                  <option>
                    {cartItem.color}
                  </option>
               
              </select>
            </div>

            {/* Gift Wrapping Option */}
<div className="flex items-center mb-3 mt-4">
 
 <label htmlFor="giftWrapping" className="flex items-center gap-2 text-gray-700 cursor-pointer">
   <img
     src="https://cdn-icons-png.flaticon.com/512/6664/6664427.png" // Replace with your preferred gift icon
     alt="Gift Icon"
     className="w-6 h-6"
   />
   Gift Wrapping available for an extra <span className="font-semibold">₹30</span>.
 </label>
 <input
   type="checkbox"
   id="giftWrapping"
   className="w-5 h-5 cursor-pointer rounded-lg accent-gray-600"
   checked={giftWrapping}
   onChange={() => setGiftWrapping((prev) => !prev)}
 />
</div>


            {/* Add to Cart Button */}
         
            <button 
             onClick={addToCart}
             disabled={cartLoading}
             className="w-full font-bold bg-[#E6FF87] text-black font-forumNormal text-lg py-3 mt-4 rounded-md hover:bg-[#cdff18] transition">
             {cartLoading ? <Spinner className="w-5 h-5 text-center justify-center"/> : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
</div>
  );
};

export default HoodiesPage;

