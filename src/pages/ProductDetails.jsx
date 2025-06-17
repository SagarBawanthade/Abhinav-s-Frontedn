import { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {  useNavigate, useParams } from "react-router-dom";
import { FaTruck, FaTimesCircle, FaExchangeAlt } from "react-icons/fa";
import Spinner from "../components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import MoreProduct3 from "../components/MoreProduct3";
import MoreProduct2 from "../components/MoreProduct2";
import { fetchCartItems } from "../feature/cartSlice";
import { addToWishlist, removeFromWishlist } from "../feature/wishlistSlice";
import { ShoppingCart, Heart } from 'lucide-react'; 
import { addToLocalCart } from "../feature/cartSlice";
import ProductHeader from "../components/ProductHeader";
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import MoreProducts1 from "../components/MoreProducts1";
import SpecialOffer from "../components/SpecialOffer";


function ProductDetails() {
  const [mainImage, setMainImage] = useState(
    "https://rukminim2.flixcart.com/image/832/832/xif0q/sweatshirt/a/a/r/xl-lavender-abhinavs-best-of-world-original-imah75prsgfbrsxf.jpeg?q=70&crop=false"
  );
  const [openSection, setOpenSection] = useState(null);
  const [product, setProduct] = useState(null); // State to store product details
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const { productId } = useParams();
  const productDetailsRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const returnPolicyRef = useRef(null);
  const userId = useSelector((state) => state.auth.id); 
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.items);
  const isInWishlist = wishlist.some(item => item._id === productId);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

 
  const scrollPositionRef = useRef(0);
  
  const handleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(productId));
      toast.success("Product removed from Wishlist!");
      console.log("After Removing Wishlist:- ",wishlist);
    } else {
      dispatch(addToWishlist(product));
      toast.success("Product Added to Wishlist!");
      console.log("After Adding Wishlist:- ",wishlist);
    }
  };

 


  const [cartLoading, setCartLoading] = useState(false);
  const [quantity, setQuantity] = useState(1); // Highlighted for quantity updates
  const [selectedSize, setSelectedSize] = useState(""); // Highlighted for size updates
  const [selectedColor, setSelectedColor] = useState([""]); // Highlighted for color updates
  const [giftWrapping, setGiftWrapping] = useState(false);
  const [selectedMenSize, setSelectedMenSize] = useState("");
  const [selectedWomenSize, setSelectedWomenSize] = useState("");
 
  const [productDetailsHeight, setProductDetailsHeight] = useState(0);
  const [returnPolicyHeight, setReturnPolicyHeight] = useState(0);
 
  useEffect(() => {
    if (productDetailsRef.current) {
      setProductDetailsHeight(productDetailsRef.current.scrollHeight);
    }
    if (returnPolicyRef.current) {
      setReturnPolicyHeight(returnPolicyRef.current.scrollHeight);
    }
  }, [openSection]);


  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

   useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setIsLoading(true); // Start loading
        const response = await fetch(
          `https://backend.abhinavsofficial.com/api/product/getproduct/${productId}` // API endpoint for fetching product details
        );
        const data = await response.json();
        
        setProduct(data);
        setMainImage(data?.images?.[0]); 
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = async () => {
    let formattedSize;
  
    if (product.category === "Couple-Tshirt") {
      // Ensure both sizes are selected for couple t-shirts
      if (!selectedMenSize || !selectedWomenSize) {
        toast.error("Please select sizes for both men and women!");
        return;
      }
      formattedSize = `Men: ${selectedMenSize}, Women: ${selectedWomenSize}`;
    } else {
      // Ensure a single size is selected for other categories
      if (!selectedSize) {
        toast.error("Please select a size before adding to cart!");
        return;
      }
      formattedSize = selectedSize;
    }
  
    const cartItem = {
      product: productId,
      quantity,
      color: product.color && product.color.length > 0 ? selectedColor : "",
      size: formattedSize, // Ensure size is always a string
      giftWrapping: giftWrapping,
      name: product.name,
      images: product.images,
      price: product.price,
    };
  
    
    if (userId && token) {
      try {
        setCartLoading(true);
        const response = await fetch(
          "https://backend.abhinavsofficial.com/api/cart/add-to-cart",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(cartItem), // Directly send cartItem
          }
        );
  
        const data = await response.json();
        if (response.ok && data.cart) {
          toast.success("Product added to Cart Successfully!");
          dispatch(fetchCartItems({ userId, token }));
          navigate("/cart");
        } else {
          toast.error(data.error || "Failed to add product to cart.");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to add product to cart.");
      } finally {
        setCartLoading(false);
      }
    } else {
      dispatch(addToLocalCart(cartItem));
      toast.success("Product added to cart!");
      navigate("/cart");
    }
  };
  
  const handleThumbnailClick = (src) => {
    setMainImage(src);
  };

  useEffect(() => {
    // Set usingBrowserNavigation to true when the component first loads
    sessionStorage.setItem('usingBrowserNavigation', 'true');
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Store that we're using browser navigation
      sessionStorage.setItem('usingBrowserNavigation', 'true');
    };
  
    // Listen for browser back button
    window.addEventListener('popstate', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('popstate', handleBeforeUnload);
    };
  }, []);
  
  // MODIFIED: Back button handler
  const handleBackToShop = () => {
    // Mark that we're using custom navigation
    sessionStorage.setItem('usingBrowserNavigation', 'false');
    
    // Get previous category or default to shop
    const previousCategory = location.state?.fromCategory || "/shop";
    navigate(previousCategory, { state: { fromProduct: true } });
  };
  
  // ADDED: Clean up function
  useEffect(() => {
    return () => {
      // This runs when component unmounts
      const usingBrowserNav = sessionStorage.getItem('usingBrowserNavigation') === 'true';
      if (!usingBrowserNav) {
        // Clean up scroll positions if not using browser navigation
        Object.keys(sessionStorage).forEach(key => {
          if (key.startsWith('shopScrollPosition')) {
            sessionStorage.removeItem(key);
          }
        });
      }
    };
  }, []);
  
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner /> {/* Display spinner during loading */}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Product not found.</p>
      </div>
    );
  }

  return (
    <>
    
    
    <div ref={productDetailsRef} className="bg-headerBackGround">
   
      <div className="container bg-headerBackGround mx-auto px-4 py-8">
     
      <div className="font-forumNormal bg-headerBackGround flex flex-wrap -mx-4">
     {/* Product Images with Swiper */}
<div className="w-full md:w-1/2 px-4 mb-8">
  {/* Main Swiper */}
  <Swiper
    spaceBetween={10}
    navigation={true}
    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
    modules={[FreeMode, Navigation, Thumbs]}
    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)} // Track active image
    className="rounded-lg overflow-hidden mb-4"
  >
    {product.images?.map((image, index) => (
      <SwiperSlide key={index}>
        <div className="aspect-w-1 aspect-h-1">
          <img 
            src={image} 
            alt={`Product ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
        
  {/* {product.category && (
    <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden">
      <div className={`
        bg-[#0C3937]
        text-white shadow-lg  text-xs
        absolute font-semibold  top-0 left-0 transform -rotate-45 translate-y-8 -translate-x-12 w-40 text-center md:py-2 md:text-md
      `}>
    <div className="flex text-sm items-center justify-center sm:line-height-[normal] md:text-md" style={{ lineHeight: "12px" }}>

          <span>
            {product.category === "Oversize-Tshirt" ? "60%" : 
              product.category === "Tshirt" ? "50%" : 
              product.category === "Hoodies" ? "30%" : 
              product.category === "Couple-Tshirt" ? "40%" : "SALE"}
            <span className="ml-0.5">OFF</span>
          </span>
        </div>
      </div>
    </div>
  )} */}
      </SwiperSlide>
    ))}
  </Swiper>

  {/* Thumbs Swiper */}
  <Swiper
    onSwiper={setThumbsSwiper}
    spaceBetween={10}
    slidesPerView={6}
    freeMode={true}
    watchSlidesProgress={true}
    modules={[FreeMode, Navigation, Thumbs]}
    className="thumbs-swiper mt-4"
  >
    {product.images?.map((image, index) => (
      <SwiperSlide key={index}>
        <div className="cursor-pointer">
          <img 
            src={image} 
            alt={`Thumbnail ${index + 1}`}
            className={`w-full h-full object-cover rounded-md transition duration-300
              ${index === activeIndex ? 'brightness-100 opacity-50' : 'brightness-75 opacity-100'}`} 
          />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>
          {/* Product Details */}
          <div className="w-full md:w-1/2 px-4"> 
            <h2 className="text-3xl font-bold mb-2 flex ">
             {product.name}<ProductHeader product={product} />
                      </h2>
                      <div className="mb-4 flex items-center gap-4">
                        <span className="text-2xl font-semibold ">₹{product.price}</span>
                        {/* <span className="text-gray-700 line-through">₹{product.price + 1400}</span> */}
                        <span className="text-xl text-gray-700 line-through">
            ₹
            {product.price +
              (product.category === "Oversize-Tshirt"
                ? 1400
                : product.category === "Tshirt"
                ? 500
                : product.category === "Hoodies"
                ? 1500
                : product.category === "Couple-Tshirt"
                ? 1000
                : 0)}
          </span>


            </div>
            <span className={`inline-block text-sm font-medium px-3 py-1 rounded mb-4 ${product.stock > 0 ? 'bg-red-400 text-white' : 'bg-red-100 text-red-800'}`}>
              {product.stock > 0 ? "Only Few Left, Hurry Up!!" : "Out of Stock"}
            </span>

            
             {/* Only show for products created before March 4, 2025 */}
 {new Date(product.createdAt) < new Date('2025-03-04') && (
   <div className="w-full p-2 mb-5 bg-gradient-to-r from-[#0C3937] to-blue-50 text-white flex items-center">
     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
       <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
     </svg>
     <span className="font-forumNormal text-sm md:text-lg">
       {(() => {
         const baseNumber = product._id ? 
           (parseInt(product._id.toString().slice(-6), 16) % 80) + 50 : 
           (product.name.length * 7) % 80 + 50;
         
         return `${baseNumber} people bought this in the last 7 days`;
       })()}
     </span>
   </div>
 )}
          


            <p className="text-gray-700 mb-6">
              {product.description}
            </p>

            
            {/* Modified Color Dropdown */}
            {(product.color && product.color !== '-' && 
  (Array.isArray(product.color) ? product.color.length > 0 : true)) && (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-2">Color:</h3>
    <select
      className="block w-40 p-3 border bg-headerBackGround text-lg focus:outline-none"
      value={selectedColor}
      onChange={(e) => setSelectedColor(e.target.value)}
    >
      <option value="" disabled>
        Select color
      </option>
      {Array.isArray(product.color) ? (
        product.color.map((color, index) => (
          <option key={index} value={color}>
            {color}
          </option>
        ))
      ) : (
        <option value={product.color}>
          {product.color}
        </option>
      )}
    </select>
  </div>
)}

<div className="mt-6 mb-6">
  <h3 className="text-lg font-semibold mb-2">Size:</h3>

  {/* Show separate size options only for couple t-shirts */}
  {product.category === "Couple-Tshirt" ? (
    <div className="flex flex-col gap-4">
      {/* Men's Size */}
      <div>
        <h4 className="font-semibold">Men's Size:</h4>
        <div className="flex gap-4">
          {product.size.map((size) => (
            <label key={`men-${size}`} className="flex items-center">
              <input 
                type="radio" 
                name="men-size" 
                value={size}
                className="hidden" 
                onChange={() => setSelectedMenSize(size)}
              />
              <span 
                className={`w-10 h-10 flex items-center justify-center rounded-md border text-gray-800 cursor-pointer hover:bg-gray-500 hover:text-white transition duration-300 
                ${selectedMenSize === size ? "bg-gray-500 text-white border-gray-500" : "bg-white border-gray-400"}`}
              >
                {size}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Women's Size */}
      <div>
        <h4 className="font-semibold">Women's Size:</h4>
        <div className="flex gap-4">
          {product.size.map((size) => (
            <label key={`women-${size}`} className="flex items-center">
              <input 
                type="radio" 
                name="women-size" 
                value={size}
                className="hidden" 
                onChange={() => setSelectedWomenSize(size)}
              />
              <span 
                className={`w-10 h-10 flex items-center justify-center rounded-md  border text-gray-800 cursor-pointer hover:bg-gray-500 hover:text-white transition duration-300 
                ${selectedWomenSize === size ? "bg-gray-500 text-white border-gray-500" : "bg-white border-gray-400"}`}
              >
                {size}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  ) : (
    // Normal single size selection for other categories
    <div className="flex gap-4">
      {product.size.map((size) => (
        <label key={size} className="flex items-center">
          <input 
            type="radio" 
            name="size" 
            value={size}
            className="hidden" 
            onChange={() => setSelectedSize(size)} // Using selectedMenSize for consistency
          />
          <span 
            className={`w-10 h-10 flex items-center justify-center rounded-md border text-gray-800 cursor-pointer hover:bg-gray-500 hover:text-white transition duration-300 
            ${selectedSize === size ? "bg-gray-500 text-white border-gray-500" : "bg-white border-gray-400"}`}
          >
            {size}
          </span>
        </label>
      ))}
    </div>
  )}
</div>



{/* Quantity Selection */}
<div className="mt-6 mb-6">
  <h3 className="text-lg font-semibold mb-2">Quantity:</h3>
  <div className="flex items-center">
    <button
      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-700 transition duration-300"
      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} // Ensure quantity doesn't go below 1
    >
      -
    </button>
    <span className="mx-4 text-lg font-medium">{quantity}</span>
    <button
      className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-300 transition duration-300"
      onClick={() => setQuantity((prev) => prev + 1)}
    >
      +
    </button>
  </div>
</div>

{/* Delivery and Return Info */}
<div className="mt-6 mb-6">
  <div className="flex items-center gap-3 mb-4">
    <FaTruck className="text-green-600" size={20} />
    <span className="text-gray-700">Free Delivery Available </span>
  </div>
  <div className="flex items-center gap-3 mb-4">
    <FaTimesCircle className="text-red-600" size={20} />
    <span className="text-gray-700">No Cash on Delivery</span>
  </div>
  <div className="flex items-center gap-3">
    <FaExchangeAlt className="text-blue-600" size={20} />
    <span className="text-gray-700">2-Day Size Exchange Only</span>
  </div>
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

<div className="flex w-full gap-4">

  {/* Check if category is tshirt or oversized-tshirt */}


 
  
  <button
    onClick={handleAddToCart}
    className="flex-1 rounded-lg bg-gray-800 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-gray-600"
  >
    <div className="flex items-center justify-center space-x-2">
      <ShoppingCart className="w-5 h-5" />
      <span>Add to Cart</span>
    </div>
  </button>



<button
  onClick={handleWishlist}
  className="flex-1 rounded-lg bg-red-500 py-3 text-lg font-semibold text-white transition duration-300 hover:bg-red-700"
>
  <div className="flex items-center justify-center space-x-2">
    <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-white' : ''}`} />
    <span>{isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
  </div>
</button>
    </div>


     {/* <SpecialOffer />  */}




             {/* Product Details Dropdown */}
      <div className="mt-4">
        <button
          onClick={() => toggleSection("productDetails")}
          className="flex items-center justify-between w-50 text-lg mb-2 py-3 text-gray-800 bg-headerBackGround font-semibold focus:outline-none"
        >
          <span>Product Details & Sizes</span>
          {openSection === "productDetails" ? (
            <FaChevronUp className="ml-2 transform transition-transform duration-300" />
          ) : (
            <FaChevronDown className="ml-2 transform transition-transform duration-300" />
          )}
        </button>
        <div
          ref={productDetailsRef}
          className="overflow-hidden transition-all duration-300 ease-in-out bg-headerBackGround"
          style={{
            maxHeight: openSection === "productDetails" ? `${productDetailsHeight}px` : "0",
            opacity: openSection === "productDetails" ? 1 : 0
          }}
        >
          <div className="px-4 py-3 text-gray-700 font-forumNormal">

          {product.category !== "Oversize-Tshirt" && product.category !== "Hoodies" && (
  <div className="mb-6">
    <h4 className="font-semibold mb-3">Size Chart</h4>
    <img
      src="/images/tshirt-size.jpg"
      alt="Size Chart"
      className="w-full max-w-2xl mx-auto h-auto object-contain rounded-lg"
    />
 </div>
)}


                        {product.category !== "Hoodies" && product.category !== "Tshirt" && product.category !== "Couple-Tshirt" && (
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Size Chart</h4>
                  <img
                    src="/images/oversize-size.jpg" // Replace with your actual image path
                    alt="Size Chart"
                    className="w-full max-w-2xl mx-auto h-auto object-contain rounded-lg"
                  />
                </div>
              )}





            <p><strong>Fabric:- </strong> {product.details.fabric}</p>
            {/* <p><strong>Care Instructions:- </strong> {product.details.careInstructions}</p> */}
            <p><strong>FabricCare:- </strong>{product.details.fabricCare}</p>
            {/* <p><strong>Hooded:- </strong> {product.details.hooded}</p> */}
            {/* <p><strong>KnitType:- </strong> {product.details.knitType}</p> */}
            <p><strong>Material:- </strong> {product.details.material}</p>
            <p><strong>Neck:- </strong> {product.details.neck}</p>
            {/* <p><strong>NetQuantity:- </strong> {product.details.netQuantity}</p> */}
            <p><strong>Occasion:- </strong>{product.details.occasion}</p>
            <p><strong>Origin:- </strong> {product.details.origin}</p>
            <p><strong>Pattern:- </strong> {product.details.pattern}</p>
            {/* <p><strong>Pockets:- </strong> {product.details.pockets}</p>
            <p><strong>Reversible:- </strong> {product.details.reversible}</p>
            <p><strong>SecondaryColor:- </strong> {product.details.secondaryColor}</p> */}
            <p><strong>ShippingInfo:- </strong> {product.details.shippingInfo}</p>
            <p><strong>Sleeve:- </strong> {product.details.sleeve}</p>
            {/* <p><strong>StyleCode:- </strong> {product.details.styleCode}</p> */}
            <p><strong>SuitableFor:- </strong> {product.details.suitableFor}</p>
          </div>
        </div>
      </div>
 
      {/* Return and Exchange Policy Dropdown */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("returnPolicy")}
          className="flex items-center justify-between w-64 text-lg mb-2 py-3 text-gray-800 bg-headerBackGround font-semibold focus:outline-none"
        >
          <span>Return & Exchange Policy</span>
          {openSection === "returnPolicy" ? (
            <FaChevronUp className="ml-2 transform transition-transform duration-300" />
          ) : (
            <FaChevronDown className="ml-2 transform transition-transform duration-300" />
          )}
        </button>
        <div
          ref={returnPolicyRef}
          className="overflow-hidden transition-all duration-300 ease-in-out bg-headerBackGround"
          style={{
            maxHeight: openSection === "returnPolicy" ? `${returnPolicyHeight}px` : "0",
            opacity: openSection === "returnPolicy" ? 1 : 0
          }}
        >
          <div className="px-4 py-3 text-gray-700 font-forumNormal">
            {/* <p>The brand does not accept returns, but replacements are possible subject to availability. 
            Please initiate replacements from the &#39;My Orders&#39; section in the App within 2 days of Delivery. 
            The product must be in its original condition with all tags attached.</p> */}


<p>
  The brand does accept returns, but replacements are possible subject to availability.
  
  Please initiate replacements from the &#39;My Orders&#39; section in the App within 2 days of Delivery.  
  The product must be in its original condition with all tags attached.  
  Exchange is available for 2 days from the delivery date.
</p>



          </div>
        </div>
      </div>


       
          </div>
        </div>
      </div>
    </div>

    <MoreProducts1 />
    <MoreProduct2 />
    <MoreProduct3/>

    <style jsx>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #4a5568;
          background: rgba(255, 255, 255, 0.8);
          padding: 20px;
          border-radius: 50%;
          width: 40px;
          height: 40px;
        }

        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
        }

        .swiper-button-disabled {
          opacity: 0.35;
          cursor: not-allowed;
        }

        .thumbs-swiper .swiper-slide {
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }

        .thumbs-swiper .swiper-slide-thumb-active {
          opacity: 1;
        }
      `}</style>
    
    </>
  );
}

export default ProductDetails;
