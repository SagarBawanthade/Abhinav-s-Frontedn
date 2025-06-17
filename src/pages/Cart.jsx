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
  let tshirtTotalPrice = 0;
  let oversizedTotalPrice = 0;

  // Loop through cart items and calculate totals
  cartItems.forEach(item => {
    const category = item.category || item.product?.category;
    const price = item.price;
    const quantity = item.quantity;

    if (category === 'Tshirt') {
      tshirtCount += quantity;
      tshirtTotalPrice += price * quantity;
    }

    if (category === 'Oversize-Tshirt') {
      oversizedTshirtCount += quantity;
      oversizedTotalPrice += price * quantity;
    }
  });

  return {
    tshirtCount,
    oversizedTshirtCount,
    tshirtDiscount: 0,
    oversizedDiscount: 0,
    appliedTshirtOffers: [],
    appliedOversizedOffers: [],
    totalDiscount: 0,
    totalPrice: tshirtTotalPrice + oversizedTotalPrice
  };
};


  // // Fixed function to apply special pricing logic
  // const calculateSpecialPricing = () => {
  //   // Count regular t-shirts (price = 599)
  //   const regularTshirts = cartItems.filter(item => 
  //     (item.category === 'Tshirt' || item.product?.category === 'Tshirt') && item.price === 599
  //   );
    
  //   const tshirtCount = regularTshirts.reduce((count, item) => count + item.quantity, 0);

  //   // Count oversized t-shirts
  //   const oversizedTshirts = cartItems.filter(item => 
  //     item.category === 'Oversize-Tshirt' || item.product?.category === 'Oversize-Tshirt'
  //   );
    
  //   const oversizedTshirtCount = oversizedTshirts.reduce((count, item) => count + item.quantity, 0);

  //   // Calculate regular t-shirt pricing
  //   let tshirtDiscount = 0;
  //   let appliedTshirtOffers = [];
    
  //   if (tshirtCount >= 2) {
  //     // Strategy: Use 3-for-999 first, then 2-for-899 for remaining
  //     let remainingTshirts = tshirtCount;
      
  //     // Apply 3-for-999 offers
  //     const sets3for999 = Math.floor(remainingTshirts / 3);
  //     remainingTshirts -= sets3for999 * 3;
      
  //     // Apply 2-for-899 offers for remaining t-shirts
  //     const sets2for899 = Math.floor(remainingTshirts / 2);
  //     remainingTshirts -= sets2for899 * 2;
      
  //     // Calculate total regular price for all t-shirts
  //     const totalRegularPrice = tshirtCount * 599;
      
  //     // Calculate special price
  //     const specialPrice = (sets3for999 * 999) + (sets2for899 * 899) + (remainingTshirts * 599);
      
  //     // Calculate discount
  //     tshirtDiscount = totalRegularPrice - specialPrice;
      
  //     // Track applied offers
  //     if (sets3for999 > 0) {
  //       appliedTshirtOffers.push({
  //         type: '3for999',
  //         sets: sets3for999,
  //         description: `${sets3for999} set${sets3for999 > 1 ? 's' : ''} of 3 T-shirts for ₹999`,
  //         savings: sets3for999 * (3 * 599 - 999)
  //       });
  //     }
      
  //     if (sets2for899 > 0) {
  //       appliedTshirtOffers.push({
  //         type: '2for899',
  //         sets: sets2for899,
  //         description: `${sets2for899} set${sets2for899 > 1 ? 's' : ''} of 2 T-shirts for ₹899`,
  //         savings: sets2for899 * (2 * 599 - 899)
  //       });
  //     }
  //   }

  //   // Calculate oversized t-shirt pricing
  //   let oversizedDiscount = 0;
  //   let appliedOversizedOffers = [];
    
  //   if (oversizedTshirtCount >= 2) {
  //     const oversizedPairs = Math.floor(oversizedTshirtCount / 2);
  //     const remainingOversized = oversizedTshirtCount % 2;
      
  //     // Calculate total regular price for oversized t-shirts
  //     let totalOversizedRegularPrice = 0;
  //     oversizedTshirts.forEach(item => {
  //       totalOversizedRegularPrice += item.price * item.quantity;
  //     });
      
  //     // Calculate special price for oversized
  //     const oversizedRegularPricePerItem = oversizedTshirts.length > 0 ? oversizedTshirts[0].price : 0;
  //     const specialOversizedPrice = (oversizedPairs * 999) + (remainingOversized * oversizedRegularPricePerItem);
      
  //     // Calculate discount
  //     oversizedDiscount = totalOversizedRegularPrice - specialOversizedPrice;
      
  //     if (oversizedPairs > 0) {
  //       appliedOversizedOffers.push({
  //         type: 'oversized2for999',
  //         sets: oversizedPairs,
  //         description: `${oversizedPairs} set${oversizedPairs > 1 ? 's' : ''} of 2 Oversized T-shirts for ₹999`,
  //         savings: oversizedDiscount
  //       });
  //     }
  //   }

  //   return {
  //     tshirtCount,
  //     oversizedTshirtCount,
  //     tshirtDiscount: Math.max(0, tshirtDiscount),
  //     oversizedDiscount: Math.max(0, oversizedDiscount),
  //     appliedTshirtOffers,
  //     appliedOversizedOffers,
  //     totalDiscount: Math.max(0, tshirtDiscount) + Math.max(0, oversizedDiscount)
  //   };
  // };

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

  // Generate promotional messages
  const getPromotionalMessages = () => {
    const messages = [];
    const { tshirtCount, oversizedTshirtCount } = pricingData;
    
    // T-shirt promotional messages
    if (tshirtCount === 1) {
      messages.push({
        type: 'warning',
        icon: '🛍️',
        text: 'Add 1 more T-shirt to get 2 for ₹899! (Save ₹299)'
      });
    } else if (tshirtCount === 2) {
      messages.push({
        type: 'success',
        icon: '🎉',
        text: 'Amazing! You got 2 T-shirts for ₹899. Add 1 more to get 3 for ₹999!'
      });
    } else if (tshirtCount > 2) {
      const remaining = tshirtCount % 3;
      if (remaining === 1) {
        messages.push({
          type: 'warning',
          icon: '💡',
          text: 'Add 1 more T-shirt to complete another set of 2 for ₹899!'
        });
      } else if (remaining === 2) {
        messages.push({
          type: 'warning',
          icon: '🔥',
          text: 'Add 1 more T-shirt to get another set of 3 for ₹999!'
        });
      }
    }
    
    // Oversized t-shirt promotional messages
    if (oversizedTshirtCount === 1) {
      messages.push({
        type: 'warning',
        icon: '👕',
        text: 'Add 1 more Oversized T-shirt to get 2 for ₹999!'
      });
    } else if (oversizedTshirtCount > 2 && oversizedTshirtCount % 2 === 1) {
      messages.push({
        type: 'warning',
        icon: '💫',
        text: 'Add 1 more Oversized T-shirt to get another set of 2 for ₹999!'
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

        {/* Active Offers Banner
        <div className="mb-6 bg-gradient-to-r from-emerald-50 via-blue-50 to-purple-50 dark:from-emerald-900/10 dark:via-blue-900/10 dark:to-purple-900/10 rounded-xl p-4 sm:p-6 border border-emerald-200 dark:border-emerald-700/50 shadow-sm">
          <div className="flex items-center mb-4">
            <div className="bg-emerald-100 dark:bg-emerald-900/30 rounded-full p-2 mr-3">
              <FaTag className="text-emerald-600 dark:text-emerald-400 text-lg" />
            </div>
            <h2 className="font-forumNormal text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              🔥 Limited Time Offers
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border-l-4 border-emerald-500 shadow-sm">
              <div className="text-emerald-700 dark:text-emerald-400 font-bold text-sm sm:text-base font-forumNormal">
                🛍️ T-SHIRTS: 2 for ₹899
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-forumNormal mt-1">
                Save ₹299 on every 2 T-shirts
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border-l-4 border-blue-500 shadow-sm">
              <div className="text-blue-700 dark:text-blue-400 font-bold text-sm sm:text-base font-forumNormal">
                🎉 T-SHIRTS: 3 for ₹999
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-forumNormal mt-1">
                Save ₹798 on every 3 T-shirts
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 border-l-4 border-purple-500 shadow-sm sm:col-span-2 lg:col-span-1">
              <div className="text-purple-700 dark:text-purple-400 font-bold text-sm sm:text-base font-forumNormal">
                👕 OVERSIZED: 2 for ₹999
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm font-forumNormal mt-1">
                Special deal on oversized tees
              </div>
            </div>
          </div>
        </div> */}

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
            <div className="lg:col-span-2 ">
              <div className="space-y-4 sm:space-y-6 ">
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
                  {/* Original Price */}
                  <div className="flex justify-between items-center">
                    <span className="font-forumNormal text-gray-600 dark:text-gray-400">Original Price</span>
                    <span className="font-forumNormal text-gray-900 dark:text-white">₹{subtotalBeforeDiscount}</span>
                  </div>

                  {/* Applied Offers */}
                  {pricingData.appliedTshirtOffers.map((offer, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="font-forumNormal text-emerald-600 dark:text-emerald-400">
                        {offer.description}
                      </span>
                      <span className="font-forumNormal text-emerald-600 dark:text-emerald-400 font-medium">
                        -₹{offer.savings}
                      </span>
                    </div>
                  ))}

                  {pricingData.appliedOversizedOffers.map((offer, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="font-forumNormal text-emerald-600 dark:text-emerald-400">
                        {offer.description}
                      </span>
                      <span className="font-forumNormal text-emerald-600 dark:text-emerald-400 font-medium">
                        -₹{offer.savings}
                      </span>
                    </div>
                  ))}

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

                  {/* Promotional Messages
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
                  ))} */}

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