import { useEffect, useRef, useState } from "react";
import { FaTrashAlt, FaGift } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner.jsx"; 
import { useDispatch } from "react-redux";
import { fetchCartItems, loadLocalStorage, removeFromLocalCart, removeItemFromCart } from "../feature/cartSlice.jsx";
import { toast } from "react-toastify";
import useCartManagement from "../components/CartManagamnet.jsx";
// import LoginPrompt from "../components/LoginPrompt.jsx";

const Cart = () => {
  
  const userId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = Boolean(userId && token);

    // // State to control the modal visibility
    // const [isModalOpen, setIsModalOpen] = useState(!isLoggedIn);

    // // Function to close the modal
    // const closeModal = () => {
    //   setIsModalOpen(false);
    // };
 
  
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const Cart = useRef(null);
  const cartItems = useSelector((state) => state.cart.items);
  console.log("Very Last cartItems:-",cartItems);

  useEffect(() => {
    if (userId && token) {
      dispatch(fetchCartItems({ userId, token }));
    }
  }, [dispatch, userId, token]);


  const handleCheckoutClick = () => {
    if (cartItems.length === 0) {
      toast.error("No items in the cart");
      return;
    }
  
    if (!isLoggedIn) {
      // Save the intended destination
      localStorage.setItem('redirectAfterLogin', '/checkout');
      // Redirect to login page
      navigate('/login');
      toast.info("Please login to proceed with checkout");
    } else {
      // User is logged in, go directly to checkout
      navigate('/checkout');
    }
  };

   



  //  // Load cart data based on auth status
  //  useEffect(() => {
  //   if (isLoggedIn) {
  //     dispatch(fetchCartItems({ userId, token }));
  //   }
  // }, [isLoggedIn, dispatch, userId, token]);

  // // Sync local cart with backend after login
  // useEffect(() => {
  //   if (isLoggedIn && cartItems.length > 0) {
  //     dispatch(syncLocalCartWithBackend({ userId, token, localCart: cartItems }));
  //   }
  // }, [isLoggedIn]);

// In both Cart.jsx and CheckoutPage.jsx
useCartManagement();
 

// Calculate Subtotal
const subtotal = cartItems.reduce(
  (acc, item) => acc + item.price * item.quantity + (item.giftWrapping ? 30 * item.quantity : 0), // Add 30 for gift wrapping if applicable
  0
);

  const delivery = 0; // Delivery fee

  const total = subtotal + delivery;

  useEffect(() => {
    if (Cart.current) {
      window.scrollTo({
        top: Cart.current.offsetTop - 50,
        behavior: "smooth", 
      });
    }
  }, []);

  // Show loading or error if cartItems is empty or still loading
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




// In your Cart component (Cart.jsx)
const handleRemoveItem = async (product) => {
  
  console.log("Attempting to remove product:", product);
  
  if (isLoggedIn) {
    try {
      // For logged-in users, make the API call first
      const result = await dispatch(removeItemFromCart({ 
        userId, 
        token, 
        product: product // Changed from product to productId for consistency
      })).unwrap(); // Add .unwrap() to properly handle the promise
      
      // Only proceed with local removal if the API call was successful
      if (result) {
       
        toast.success("Item removed successfully from Cart");
        // Consider if you really need this fetch since we already updated the state
        // dispatch(fetchCartItems({ userId, token }));
      }
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error("Error removing item: " + (error.message || 'Unknown error'));
    }
  } else {
    // For non-logged-in users, just remove from local storage
    dispatch(removeFromLocalCart({ product }));
    toast.success("Item removed successfully");
  }
};


  const location = useLocation();
  
  useEffect(() => {
    
    window.scrollTo(0, 0); // Scroll to top of the page
  }, [location]);


  
  
  return (
    <section ref={Cart} className="bg-headerBackGround py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="font-forumNormal text-gray-900 dark:text-white text-3xl">My Cart</h2>

        {/* Show spinner while loading */}
        {loading && <Spinner />}


      {/* {!isLoggedIn && (<LoginPrompt isOpen={isModalOpen} closeModal={closeModal} />)}
       */}

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
  />  </a>

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
                ₹{item.price }
              </p>
            </div>
          </div>
          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
       
              <p className="text-2xl font-forumNormal text-gray-900 hover:underline dark:text-white">
                {item.name}
              </p>
          
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p className="text-black text-lg font-forumNormal">
                Color: <span className="font-forumNormal text-black">{item.color}</span>
              </p>
              <p className="font-forumNormal text-black text-lg">
                Size: <span className="font-forumNormal text-black">{item.size}</span>
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
                      <dd className="text-gray-900 dark:text-white">₹{subtotal}</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="font-forumNormal text-gray-500 dark:text-gray-400 mb-6">Delivery</dt>
                      <dd className="font-forumNormal text-green-600">-₹FREE</dd>
                    </dl>

                    <p className="font-forumNormal underline text-green-600 dark:text-green-600">Maharashtra, India</p>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="font-forumNormal text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                    <dd className="font-forumNormal text-lg font-bold text-gray-900 dark:text-white">₹{subtotal === 0 ? "0":total}</dd>
                  </dl>
                </div>

                {/* <Link to={cartItems.length === 0 ? "#" : "/checkout"}> */}

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

  {/* <button
    onClick={() => {
      if (cartItems.length === 0 ) {
        toast.error("No items in the cart");
      }
    }}
    disabled={ cartItems.length === 0}
    className={`flex w-full text-lg items-center mt-3 rounded-lg justify-center font-forumNormal px-5 py-2.5 text-white focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800 ${
      cartItems.length === 0
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-homePage hover:opacity-80 dark:bg-primary-600 dark:hover:bg-primary-700"
    }`}
  >
    Proceed to Checkout
  </button> */}
{/* </Link> */}


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
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
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



