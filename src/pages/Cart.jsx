import { useEffect, useRef, useState } from "react";
import { FaTrashAlt, FaGift, FaTag } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner.jsx"; 
import { useDispatch } from "react-redux";
import { fetchCartItems, loadLocalStorage, removeFromLocalCart, removeItemFromCart } from "../feature/cartSlice.jsx";
import { toast } from "react-toastify";



const Cart = () => {
  const location = useLocation();
  const userId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = Boolean(userId && token);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const Cart = useRef(null);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    console.log('Auth state changed:', { isLoggedIn, userId, token });
  }, [isLoggedIn, userId, token]);

  useEffect(() => {
    if (userId && token) {
      dispatch(fetchCartItems({ userId, token }));
    }
  }, [dispatch, userId, token]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleCheckoutClick = () => {
    if (cartItems.length === 0) {
      toast.error("No items in the cart");
      return;
    }
  
    if (!isLoggedIn) {
      localStorage.setItem('redirectAfterLogin', '/checkout');
      navigate('/login');
      toast.info("Please login to proceed with checkout");
    } else {
      navigate('/checkout');
    }
  };

  const calculateSpecialPricing = () => {
  let tshirtCount = 0;
  let oversizedTshirtCount = 0;
  let hoodieCount = 0;
  let tshirtTotalPrice = 0;
  let oversizedTotalPrice = 0;
  let hoodieTotalPrice = 0;
  let tshirtItems = [];

  let oversizedItems = [];
  let hoodieItems = [];

  // Loop through cart items and categorize them
  cartItems.forEach(item => {
    const category = item.category || item.product?.category;
    const price = item.price;
    const quantity = item.quantity;

    if (category === 'Tshirt') {
      tshirtCount += quantity;
      tshirtTotalPrice += price * quantity;
      tshirtItems.push({ ...item, price, quantity });
    }

    if (category === 'Oversize-Tshirt') {
      oversizedTshirtCount += quantity;
      oversizedTotalPrice += price * quantity;
      oversizedItems.push({ ...item, price, quantity });
    }
    if (category === 'Hoodies') {
      hoodieCount += quantity;
      hoodieTotalPrice += price * quantity;
      hoodieItems.push({ ...item, price, quantity });
    }
  });

  let tshirtDiscount = 0;
  let oversizedDiscount = 0;
   let hoodieDiscount = 0;
  let appliedTshirtOffers = [];
  let appliedOversizedOffers = [];
   let appliedHoodieOffers = [];

  // T-shirt offers logic
  if (tshirtCount >= 5) {
    // Buy 5 for ₹999 (for ₹249 products)ss
    const setsOf5 = Math.floor(tshirtCount / 5);
    const offer5Price = setsOf5 * 999;
    const regularPrice5 = setsOf5 * 5 * 249;
    if (regularPrice5 > offer5Price) {
      tshirtDiscount += regularPrice5 - offer5Price;
      appliedTshirtOffers.push({
        description: `T-SHIRTS: ${setsOf5} set(s) of 5 @ ₹999`,
        savings: regularPrice5 - offer5Price,
        count: setsOf5 * 5
      });
    }
  }
  
  // if (tshirtCount >= 3 && tshirtCount < 5) {
  //   // Buy 3 for ₹799 (for ₹399 products)
  //   const setsOf3 = Math.floor(tshirtCount / 3);
  //   const offer3Price = setsOf3 * 799;
  //   const regularPrice3 = setsOf3 * 3 * 399;
  //   if (regularPrice3 > offer3Price) {
  //     tshirtDiscount += regularPrice3 - offer3Price;
  //     appliedTshirtOffers.push({
  //       description: `T-SHIRTS: ${setsOf3} set(s) of 3 @ ₹799`,
  //       savings: regularPrice3 - offer3Price,
  //       count: setsOf3 * 3
  //     });
  //   }
  // }
  
  if (tshirtCount >= 2 && tshirtCount < 3) {
    // Buy 2 for ₹599 (for ₹599 products)
    const setsOf2 = Math.floor(tshirtCount / 2);
    const offer2Price = setsOf2 * 599;
    const regularPrice2 = setsOf2 * 2 * 599;
    if (regularPrice2 > offer2Price && tshirtTotalPrice >= regularPrice2) {
      tshirtDiscount += regularPrice2 - offer2Price;
      appliedTshirtOffers.push({
        description: `T-SHIRTS: ${setsOf2} set(s) of 2 @ ₹599`,
        savings: regularPrice2 - offer2Price,
        count: setsOf2 * 2
      });
    }
  }

  // Oversized T-shirt offers logic
  if (oversizedTshirtCount >= 2) {
    // Buy 1 Get 1 @ ₹799 (effectively 2 for ₹799)
    const setsOf2 = Math.floor(oversizedTshirtCount / 2);
    const offer2Price = setsOf2 * 799;
    const regularPrice2 = setsOf2 * 2 * 799;
    if (regularPrice2 > offer2Price) {
      oversizedDiscount += regularPrice2 - offer2Price;
      appliedOversizedOffers.push({
        description: `OVERSIZED: ${setsOf2} set(s) of BUY 1 GET 1 @ ₹799`,
        savings: regularPrice2 - offer2Price,
        count: setsOf2 * 2
      });
    }
  }

  // Hoodie offers logic
  if (hoodieCount >= 3) {
    // Buy any 3 hoodies for ₹1599
    const setsOf3 = Math.floor(hoodieCount / 3);
    const offer3Price = setsOf3 * 1599;
    
    // Calculate what the regular price would be for these hoodies
    // Sort hoodie items by price (descending) to apply discount to most expensive ones first
    const sortedHoodieItems = [...hoodieItems].sort((a, b) => b.price - a.price);
    let regularPrice3 = 0;
    let itemsProcessed = 0;
    
    for (let i = 0; i < sortedHoodieItems.length && itemsProcessed < setsOf3 * 3; i++) {
      const item = sortedHoodieItems[i];
      const itemsToProcess = Math.min(item.quantity, setsOf3 * 3 - itemsProcessed);
      regularPrice3 += item.price * itemsToProcess;
      itemsProcessed += itemsToProcess;
    }
    
    if (regularPrice3 > offer3Price) {
      hoodieDiscount += regularPrice3 - offer3Price;
      appliedHoodieOffers.push({
        description: `Hoodies: ${setsOf3} set(s) of 3 @ ₹1599`,
        savings: regularPrice3 - offer3Price,
        count: setsOf3 * 3
      });
    }
  }


  const totalDiscount = tshirtDiscount + oversizedDiscount + hoodieDiscount;

  return {
    tshirtCount,
     hoodieCount,
    oversizedTshirtCount,
    tshirtDiscount,
    oversizedDiscount,
    appliedTshirtOffers,
    appliedOversizedOffers,
    hoodieDiscount,
    totalDiscount,
    appliedHoodieOffers,
    totalPrice: tshirtTotalPrice + oversizedTotalPrice + hoodieTotalPrice - totalDiscount
  };
};


  // Apply special pricing
  const pricingData = calculateSpecialPricing();

  // Calculate subtotal with regular pricing first
  const subtotalBeforeDiscount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity + (item.giftWrapping ? 30 * item.quantity : 0),
    0
  );

  // Apply discount
  const subtotal = subtotalBeforeDiscount - pricingData.totalDiscount;
  const delivery = 0;
  const total = subtotal + delivery;

  useEffect(() => {
    if (Cart.current) {
      window.scrollTo({
        top: Cart.current.offsetTop - 50,
        behavior: "smooth", 
      });
    }
  }, []);

  useEffect(() => {
    if (!userId || !token) {
      setError("No user logged in.");
    }
  }, [userId, token]);

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(loadLocalStorage());
    }
  }, []);

  const handleRemoveItem = async (product) => {  
    if (isLoggedIn) {
      try {
        const result = await dispatch(removeItemFromCart({ 
          userId, 
          token, 
          product: product
        })).unwrap();
        if (result) {
          toast.success("Item removed successfully from Cart");
        }
      } catch (error) {
        toast.error("Error removing item: " + (error.message || 'Unknown error'));
      }
    } else {
      dispatch(removeFromLocalCart({ product }));
      toast.success("Item removed successfully");
    }
  };

// Function to get promotional messages
const getPromotionalMessages = () => {
  const messages = [];
  const pricingData = calculateSpecialPricing();
  
  // Group cart items by category and price
  let tshirt249Count = 0;
  let tshirt399Count = 0;
  let tshirt599Count = 0;
  let oversized799Count = 0;
  let hoodieCount = 0;
  
  cartItems.forEach(item => {
    const category = item.category || item.product?.category;
    const price = item.price;
    const quantity = item.quantity;
    
    if (category === 'Tshirt') {
      if (price === 249) tshirt249Count += quantity;
      if (price === 399) tshirt399Count += quantity;
      if (price === 599) tshirt599Count += quantity;
    }
    
    if (category === 'Oversize-Tshirt' && price === 799) {
      oversized799Count += quantity;
    } 
    if (category === 'Hoodies') {
      hoodieCount += quantity;
    }
  });
  
  // Price-specific promotional messages for T-shirts
  
  // For ₹249 T-shirts (Buy 5 @ ₹999 offer)
  if (tshirt249Count === 1) {
    messages.push({
      type: 'info',
      icon: '🛍️',
      text: 'Add 4 more T-shirts (₹249 each) to get 5 for ₹999!'
    });
  } else if (tshirt249Count === 2) {
    messages.push({
      type: 'info',
      icon: '🛍️',
      text: 'Add 3 more T-shirts (₹249 each) to get 5 for ₹999!'
    });
  } else if (tshirt249Count === 3) {
    messages.push({
      type: 'info',
      icon: '🛍️',
      text: 'Add 2 more T-shirts (₹249 each) to get 5 for ₹999!'
    });
  } else if (tshirt249Count === 4) {
    messages.push({
      type: 'info',
      icon: '🔥',
      text: 'Add 1 more T-shirt (₹249 each) to get 5 for ₹999!'
    });
  }
  
  // For ₹399 T-shirts (Buy 3 @ ₹799 offer)
  if (tshirt399Count === 1) {
    messages.push({
      type: 'info',
      icon: '🛍️',
      text: 'Add 2 more T-shirts (₹399 each) to get 3 for ₹799!'
    });
  } else if (tshirt399Count === 2) {
    messages.push({
      type: 'info',
      icon: '🎉',
      text: 'Add 1 more T-shirt (₹399 each) to get 3 for ₹799!'
    });
  }
  
  // For ₹599 T-shirts (Buy 2 @ ₹599 offer)
  if (tshirt599Count === 1) {
    messages.push({
      type: 'info',
      icon: '🛍️',
      text: 'Add 1 more T-shirt (₹599 each) to get 2 for ₹599!'
    });
  }
  
  // For ₹799 Oversized T-shirts (Buy 1 Get 1 @ ₹799 offer)
  if (oversized799Count === 1) {
    messages.push({
      type: 'info',
      icon: '👕',
      text: 'Add 1 more Oversized T-shirt (₹799) to get BUY 1 GET 1 @ ₹799!'
    });
  }
  
  // Success messages for applied offers
  if (pricingData.appliedTshirtOffers.length > 0 || pricingData.appliedOversizedOffers.length > 0) {
    messages.push({
      type: 'success',
      icon: '✅',
      text: `You saved ₹${pricingData.totalDiscount} with our special offers!`
    });
  }

    
  // For Hoodies (Buy any 3 @ ₹1599 offer)
  if (hoodieCount === 1) {
    messages.push({
      type: 'info',
      icon: '🧥',
      text: 'Add 2 more Hoodies to get ANY 3 for ₹1599!'
    });
  } else if (hoodieCount === 2) {
    messages.push({
      type: 'info',
      icon: '🔥',
      text: 'Add 1 more Hoodie to get ANY 3 for ₹1599!'
    });
  }

  // Success messages for applied offers
  if (pricingData.appliedTshirtOffers.length > 0 || pricingData.appliedOversizedOffers.length > 0 || pricingData.appliedHoodieOffers.length > 0) {
    messages.push({
      type: 'success',
      icon: '✅',
      text: `You saved ₹${pricingData.totalDiscount} with our special offers!`
    });
  }
  
  return messages;
};

  return (
   <section ref={Cart} className="bg-headerBackGround min-h-screen py-4 sm:py-8 antialiased dark:bg-gray-900">
  <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 2xl:px-0">
    {/* Header */}
    <div className="mb-6 sm:mb-8">
      <h1 className="font-forumNormal text-gray-900 dark:text-white text-2xl sm:text-3xl lg:text-4xl font-bold">
        Shopping Cart
      </h1>
    </div>

    {/* Loading Spinner */}
    {loading && (
      <div className="flex justify-center items-center py-12">
        <Spinner />
      </div>
    )}

    {/* Error Display */}
    {error && console.log(error)}

    {/* Main Content */}
    {!loading && (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4 sm:space-y-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 sm:py-24">
                <div className="mb-6">
                  <div className="text-6xl sm:text-8xl mb-4">🛒</div>
                  <h3 className="font-forumNormal text-xl sm:text-2xl text-gray-500 dark:text-gray-400 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="font-forumNormal text-gray-400 dark:text-gray-500 text-sm sm:text-base">
                    Discover our amazing products and start shopping!
                  </p>
                </div>
                <Link to="/shop">
                  <button className="bg-homePage hover:opacity-90 text-white font-forumNormal px-6 sm:px-8 py-3 rounded-lg transition-all duration-200 text-sm sm:text-base">
                    Start Shopping →
                  </button>
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="relative bg-headerBackGround dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0 mx-auto sm:mx-0">
                      <img
                        className="h-24 w-24 sm:h-28 sm:w-28 object-cover rounded-lg"
                        src={
                          Array.isArray(item.images)
                            ? item.images[0]
                            : item.images || item.image
                        }
                        alt={item.name}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-forumNormal text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {item.name}
                      </h3>
                      
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        {item.color && item.color.length > 0 && (
                          <p className="font-forumNormal">
                            <span className="font-medium">Color:</span> {item.color}
                          </p>
                        )}
                        <p className="font-forumNormal">
                          <span className="font-medium">Size:</span> {item.size}
                        </p>
                      </div>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex flex-col items-center sm:items-end gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-forumNormal text-sm text-gray-600 dark:text-gray-400">Qty:</span>
                        <span className="font-forumNormal text-lg font-bold text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="text-lg sm:text-xl font-forumNormal font-bold text-gray-900 dark:text-white">
                        ₹{item.price}
                      </div>
                    </div>
                  </div>

                  {/* Gift Wrap Indicator */}
                  {item.giftWrapping && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-1 rounded-full text-xs">
                      <FaGift />
                      <span className="font-forumNormal">Gift Wrapped</span>
                    </div>
                  )}

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(isLoggedIn ? item.product._id : item.product)}
                    className="absolute bottom-3 right-3 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-all duration-200"
                  >
                    <FaTrashAlt className="text-lg" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-headerBackGround dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200 dark:border-gray-700 sticky top-4">
            <h2 className="font-forumNormal text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Order Summary
            </h2>

            <div className="space-y-4">
              {/* Applied Offers Section - Enhanced UI */}
              {(pricingData.appliedTshirtOffers.length > 0 || pricingData.appliedOversizedOffers.length > 0) && (
                <div className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-2xl p-1 shadow-lg">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
                    {/* Header with animation */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
                          <div className="relative bg-emerald-500 rounded-full p-2">
                            <FaTag className="text-white text-sm" />
                          </div>
                        </div>
                        <h3 className="font-forumNormal font-bold text-emerald-700 dark:text-emerald-400 text-lg">
                          🎉 Active Offers
                        </h3>
                      </div>
                      <div className="bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                          SAVE ₹{pricingData.totalDiscount}
                        </span>
                      </div>
                    </div>
                    
                    {/* T-shirt Offers */}
                    {pricingData.appliedTshirtOffers.map((offer, index) => (
                      <div key={`tshirt-${index}`} className="mb-3 last:mb-0">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border-l-4 border-blue-500">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="bg-blue-500 rounded-full p-1">
                                  {/* <FaShoppingBag className="text-white text-xs" /> */}
                                </div>
                                <span className="font-forumNormal font-bold text-blue-700 dark:text-blue-400 text-sm">
                                  T-SHIRT COMBO DEAL
                                </span>
                              </div>
                              <p className="font-forumNormal text-blue-600 dark:text-blue-300 text-sm font-medium mb-1">
                                {offer.description}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-blue-500 dark:text-blue-400">
                                <span className="flex items-center space-x-1">
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                  <span>{offer.count} items included</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span>Best value deal</span>
                                </span>
                              </div>
                            </div>
                            <div className="ml-4 text-right">
                              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                -₹{offer.savings}
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">You saved</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Oversized Offers */}
                    {pricingData.appliedOversizedOffers.map((offer, index) => (
                      <div key={`oversized-${index}`} className="mb-3 last:mb-0">
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border-l-4 border-purple-500">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="bg-purple-500 rounded-full p-1">
                                  {/* <FaShoppingBag className="text-white text-xs" /> */}
                                </div>
                                <span className="font-forumNormal font-bold text-purple-700 dark:text-purple-400 text-sm">
                                  OVERSIZED SPECIAL
                                </span>
                              </div>
                              <p className="font-forumNormal text-purple-600 dark:text-purple-300 text-sm font-medium mb-1">
                                {offer.description}
                              </p>
                              <div className="flex items-center space-x-4 text-xs text-purple-500 dark:text-purple-400">
                                <span className="flex items-center space-x-1">
                                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                  <span>{offer.count} items included</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  <span>Premium deal</span>
                                </span>
                              </div>
                            </div>
                            <div className="ml-4 text-right">
                              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                                -₹{offer.savings}
                              </div>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">You saved</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Total Savings Summary */}
                    <div className="mt-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl p-3 text-center">
                      <p className="text-white font-forumNormal font-bold text-lg">
                        🎊 Total Savings: ₹{pricingData.totalDiscount}
                      </p>
                      <p className="text-emerald-100 text-sm font-forumNormal">
                        You're getting amazing deals!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Original Price */}
              <div className="flex justify-between items-center">
                <span className="font-forumNormal text-gray-600 dark:text-gray-400">Original Price</span>
                <span className="font-forumNormal text-gray-900 dark:text-white">₹{subtotalBeforeDiscount}</span>
              </div>

              {/* Total Discount */}
              {pricingData.totalDiscount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="font-forumNormal text-emerald-600 dark:text-emerald-400">Total Savings</span>
                  <span className="font-forumNormal text-emerald-600 dark:text-emerald-400 font-medium">
                    -₹{pricingData.totalDiscount}
                  </span>
                </div>
              )}

              {/* Subtotal */}
              <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-600 pt-4">
                <span className="font-forumNormal text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="font-forumNormal font-semibold text-gray-900 dark:text-white">₹{subtotal}</span>
              </div>

              {/* Delivery */}
              <div className="flex justify-between items-center">
                <span className="font-forumNormal text-gray-600 dark:text-gray-400">Delivery</span>
                <span className="font-forumNormal text-emerald-600 dark:text-emerald-400 font-medium">FREE</span>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-600 pt-4">
                <span className="font-forumNormal text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Total</span>
                <span className="font-forumNormal text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  ₹{total}
                </span>
              </div>

              {/* Promotional Messages */}
              {getPromotionalMessages().map((message, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg text-sm font-forumNormal border ${
                    message.type === 'success' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-700'
                      : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-700'
                  }`}
                >
                  <span className="mr-2">{message.icon}</span>
                  {message.text}
                </div>
              ))}

              {/* Checkout Button */}
              <button
                onClick={handleCheckoutClick}
                disabled={cartItems.length === 0}
                className={`w-full py-3 sm:py-4 px-6 rounded-lg font-forumNormal text-base sm:text-lg font-medium transition-all duration-200 ${
                  cartItems.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-homePage hover:opacity-90 text-white shadow-md hover:shadow-lg"
                }`}
              >
                Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <div className="text-center">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-sm font-forumNormal text-homePage hover:underline"
                >
                  Continue Shopping
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Location */}
              <div className="text-center text-sm font-forumNormal text-emerald-600 dark:text-emerald-400 pt-2">
                📍 Maharashtra, India
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</section>

  );
};

export default Cart;