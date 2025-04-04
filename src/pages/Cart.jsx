import { useEffect, useRef, useState } from "react";
import { FaTrashAlt, FaGift } from "react-icons/fa";
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

  // Function to apply special pricing logic
  const calculateSpecialPricing = () => {
    // Count regular and oversized t-shirts
    const tshirtCount = cartItems.reduce((count, item) => {
      // Check if the item is a regular t-shirt (modify this condition based on your product categorization)
      if (item.category === 'Tshirt' || item.product?.category === 'Tshirt') {
        return count + item.quantity;
      }
      return count;
    }, 0);

    const oversizedTshirtCount = cartItems.reduce((count, item) => {
      // Check if the item is an oversized t-shirt (modify this condition based on your product categorization)
      if (item.category === 'Oversize-Tshirt' || item.product?.category === 'Oversize-Tshirt') {
        return count + item.quantity;
      }
      return count;
    }, 0);

    // Calculate special pricing for regular t-shirts
    let tshirtDiscount = 0;
    if (tshirtCount === 3) {
      // Calculate how many sets of 3 regular t-shirts we have
      const tshirtSets = Math.floor(tshirtCount / 3);
      // For each set of 3, apply discount (assuming each t-shirt's regular price minus the special price of 999)
      const regularTshirts = cartItems.filter(item => 
        item.category === 'Tshirt' || item.product?.category === 'Tshirt'
      ).sort((a, b) => a.price - b.price); // Sort by price to discount most expensive first
      
      let remainingTshirtsToDiscount = tshirtSets * 3;
      let totalRegularPrice = 0;
      
      // Calculate what the total would be without discount
      regularTshirts.forEach(item => {
        totalRegularPrice += item.price * item.quantity;
      });
      
      // Price for sets of 3 at special price
      const specialPrice = 999 * tshirtSets;
      
      // Calculate discount as difference between regular price and special price
      tshirtDiscount = totalRegularPrice - specialPrice;
    }

    // Calculate special pricing for oversized t-shirts
    let oversizedDiscount = 0;
    if (oversizedTshirtCount === 2) {
      // Calculate how many pairs of oversized t-shirts we have
      const oversizedPairs = Math.floor(oversizedTshirtCount / 2);
      // For each pair, apply discount
      const oversizedTshirts = cartItems.filter(item => 
        item.category === 'Oversize-Tshirt' || item.product?.category === 'Oversize-Tshirt'
      ).sort((a, b) => a.price - b.price); // Sort by price to discount most expensive first
      
      let totalOversizedPrice = 0;
      
      // Calculate what the total would be without discount
      oversizedTshirts.forEach(item => {
        totalOversizedPrice += item.price * item.quantity;
      });
      
      // Price for pairs at special price
      const specialOversizedPrice = 999 * oversizedPairs;
      
      // Calculate discount as difference between regular price and special price
      oversizedDiscount = totalOversizedPrice - specialOversizedPrice;
    }

    return {
      regularTshirtDiscount: tshirtDiscount > 0 ? tshirtDiscount : 0,
      oversizedTshirtDiscount: oversizedDiscount > 0 ? oversizedDiscount : 0
    };
  };

  // Apply special pricing
  const specialPricing = calculateSpecialPricing();
  const totalDiscount = specialPricing.regularTshirtDiscount + specialPricing.oversizedTshirtDiscount;

  // Calculate subtotal with regular pricing
  const subtotalBeforeDiscount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity + (item.giftWrapping ? 30 * item.quantity : 0),
    0
  );

  // Apply discount
  const subtotal = subtotalBeforeDiscount - totalDiscount;
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

  // Count t-shirts and oversized t-shirts for display
  const tshirtCount = cartItems.reduce((count, item) => {
    if (item.category === 'Tshirt' || item.product?.category === 'Tshirt') {
      return count + item.quantity;
    }
    return count;
  }, 0);

  const oversizedTshirtCount = cartItems.reduce((count, item) => {
    if (item.category === 'Oversize-Tshirt' || item.product?.category === 'Oversize-Tshirt') {
      return count + item.quantity;
    }
    return count;
  }, 0);

  return (
    <section ref={Cart} className="bg-headerBackGround py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="font-forumNormal text-gray-900 dark:text-white text-3xl">My Cart</h2>

        {/* Show spinner while loading */}
        {loading && <Spinner />}

        {/* Show error message if loading fails */}
        {error && console.log(error)}

        {/* If cart is loaded */}
        {!loading &&  (
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6 font-forumNormal">
            <div className="space-y-6 font-forumNormal">
            {cartItems.length === 0 ? (
                    <p className="text-center justify-center font-forumNormal mt-36 text-lg text-gray-500 dark:text-gray-300">
                      No Products Found
                      <Link to="/shop">
                        <p className="text-sm hover:underline font-bold font-forumNormal">
                          Continue Shopping &rarr;
                        </p>
                      </Link>
                    </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="relative rounded-lg border border-gray-300 bg-headerBackGround p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                >
                  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <a href="#" className="shrink-0 md:order-1">
                      <img
                        className="h-28 w-28"
                        src={
                          Array.isArray(item.images)
                            ? item.images[0] // Use the first image if `images` is an array
                            : item.images || item.image // Use `images` or `image` if it's a string
                        }
                        alt={item.name}
                      />
                    </a>

                    <label htmlFor={`counter-input-${item._id}`} className="sr-only">
                      Quantity:
                    </label>
                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                      <div className="flex items-center">
                        <label className="font-forumNormal text-lg">Qty :</label>
                        <input
                          type="text"
                          id={`counter-input-${item._id}`}
                          className="w-10 shrink-0 text-lg font-forumNormal font-semibold border-0 bg-transparent text-center text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                          value={item.quantity}
                          readOnly
                        />
                      </div>
                      <div className="text-end md:order-4 md:w-32">
                        <p className="text-lg font-forumNormal font-semibold text-gray-900 dark:text-white">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>
                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                      <p className="text-2xl font-forumNormal text-gray-900 hover:underline dark:text-white">
                        {item.name}
                      </p>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {item.color && item.color.length > 0 && (
                          <p className="text-black text-lg font-forumNormal">
                            Color: <span className="font-forumNormal text-black">{item.color}</span>
                          </p>
                        )}
                        <p className="font-forumNormal text-black text-lg">
                          Size: <span className="font-forumNormal text-black">{item.size}</span>
                        </p>
                        <p className="font-forumNormal text-black text-lg">
                          Category: <span className="font-forumNormal text-black">
                            {item.category || item.product?.category || "N/A"}
                          </span>
                        </p>
                      </div>

                      {/* Gift Wrap Icon (conditionally render if gift wrap is true) */}
                      {item.giftWrapping && (
                        <div className="absolute top-2 right-2 flex items-center text-xl text-red-500">
                          <FaGift />
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Gift Wrapped</span>
                        </div>
                      )}
                    </div>

                    {/* Delete button positioned bottom-right */}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(isLoggedIn ? item.product._id : item.product)}
                      className="absolute bottom-2 right-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-500"
                    >
                      <FaTrashAlt className="text-xl" />
                    </button>
                  </div>
                </div>
              ))
            )}
            </div>
            </div>
            </div>

            {/* Order Summary Section */}
            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-300 bg-headerBackGround p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-3xl font-forumNormal text-gray-900 dark:text-white">Order summary</p>

                <div className="font-avenir space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="font-forumNormal text-gray-500 dark:text-gray-400">Subtotal</dt>
                      <dd className="text-gray-900 dark:text-white">₹{subtotalBeforeDiscount}</dd>
                    </dl>

                    {/* Show special pricing discounts if applicable */}
                    {specialPricing.regularTshirtDiscount > 0 && (
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="font-forumNormal text-green-600 dark:text-green-500">
                          Special Price: 3 T-shirts for ₹999
                        </dt>
                        <dd className="font-forumNormal text-green-600 dark:text-green-500">
                          -₹{specialPricing.regularTshirtDiscount}
                        </dd>
                      </dl>
                    )}

                    {specialPricing.oversizedTshirtDiscount > 0 && (
                      <dl className="flex items-center justify-between gap-4">
                        <dt className="font-forumNormal text-green-600 dark:text-green-500">
                          Special Price: 2 Oversized T-shirts for ₹999
                        </dt>
                        <dd className="font-forumNormal text-green-600 dark:text-green-500">
                          -₹{specialPricing.oversizedTshirtDiscount}
                        </dd>
                      </dl>
                    )}

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="font-forumNormal text-gray-500 dark:text-gray-400 mb-6">Delivery</dt>
                      <dd className="font-forumNormal text-green-600">FREE</dd>
                    </dl>

                    {/* Display promotional information */}
                    {tshirtCount > 0 && tshirtCount < 3 && (
                      <p className="font-forumNormal text-amber-600 dark:text-amber-500">
                        Add {3 - tshirtCount} more t-shirt{tshirtCount === 2 ? '' : 's'} to get 3 for ₹999!
                      </p>
                    )}

                    {oversizedTshirtCount > 0 && oversizedTshirtCount < 2 && (
                      <p className="font-forumNormal text-amber-600 dark:text-amber-500">
                        Add 1 more oversized t-shirt to get 2 for ₹999!
                      </p>
                    )}

                    <p className="font-forumNormal underline text-green-600 dark:text-green-600">Maharashtra, India</p>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="font-forumNormal text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                    <dd className="font-forumNormal text-lg font-bold text-gray-900 dark:text-white">
                      ₹{subtotal === 0 ? "0" : total}
                    </dd>
                  </dl>
                </div>

                <button
                  onClick={handleCheckoutClick}
                  disabled={cartItems.length === 0}
                  className={`flex w-full text-lg items-center mt-3 rounded-lg justify-center font-forumNormal px-5 py-2.5 text-white focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 ${
                    cartItems.length === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-homePage hover:opacity-80 dark:bg-primary-600 dark:hover:bg-primary-700"
                  }`}
                >
                  Proceed to Checkout
                </button>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                  >
                    Continue Shopping
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </Link>
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