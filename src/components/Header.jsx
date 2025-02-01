import { ShoppingCart } from 'lucide-react';
import { Heart } from 'lucide-react';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux';
import { logout } from '../feature/authSlice';
import { toast } from 'react-toastify';
import { fetchCartItems, removeFromLocalCart, removeItemFromCart } from '../feature/cartSlice';
import { User } from 'lucide-react';
import { persistor } from '../utils/store';
import HeaderSidebar from './HeaderSidebar';

const Header = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); 
  const menuRef = useRef(null); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get authentication state from Redux store
  const { id, token } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  
  const userId = useSelector((state) => state.auth.id);

  const isLoggedIn = Boolean(userId && token);


  useEffect(() => {
    if (userId && token) {
      const intervalId = setInterval(() => {
        dispatch(fetchCartItems({ userId, token }));
      }, 1000);
  
      // Cleanup the interval on component unmount or dependencies change
      return () => clearInterval(intervalId);
    }
  }, [dispatch, userId, token]);
 
 

  const handleLogout = () => {
  
   
    dispatch(logout(id, token ));
   dispatch(fetchCartItems({ userId, token }));
    persistor.purge(); 
  
    toast.success('Logged out successfully!');
    navigate('/login');
    setMenuOpen(false);
    
   
    
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
   
      if (userId && token) {
        dispatch(fetchCartItems({ userId, token }));
      }
  
  };

  // const toggleMenu = () => {
  //   setMenuOpen(!menuOpen); // Toggle the menu visibility
  // };
 



  useEffect(() => {
    // Close the menu if clicked outside of it
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

  

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartItems]); // Empty dependency array to run this effect once on mount


  const subtotal = cartItems.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );


  
  const handleRemoveItem = async (product) => {
    if (isLoggedIn) {
      try {
        await dispatch(removeItemFromCart({ userId, token, product }));
        dispatch(fetchCartItems({ userId, token }));
        toast.success("Item removed successfully");
      } catch (error) {
        toast.error("Error removing item: " + error.message);
      }
    } else {
      dispatch(removeFromLocalCart({ product }));
    }
  };
  

  // const handleRemoveItem = (productId) => {
  //   dispatch(removeItemFromCart({ userId, token, productId })).then(() => {
    
  //  dispatch(fetchCartItems({ userId, token }));
  //   setMenuOpen(true);
  //   const updatedCart = cartItems.filter(item => item.productId !== productId);
  //    localStorage.setItem('cart', JSON.stringify(updatedCart));
  //    dispatch(loadLocalCart());
  //    toast.success("Item removed successfully");
        
  // }).catch((error) => {
  //     toast.error("Error removing item: ", error);
        
  //   });
  // }
  return (
    // <header href="/" className="text-allFontColor bg-headerBackGround flex items-center justify-between px-4 py-4 md:py-6  shadow-lg font-avenir">
    <header className="bg-headerBackGround text-allFontColor shadow-lg">
     <div className="max-w-[91rem] mx-auto px-5 py-5">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center">
            {!isLoggedIn ? (
              <div className='flex flex-col items-center'>
              <MenuIcon 
                size={24}
                // onClick={toggleMenu}
                onClick={() => setSidebarOpen(true)}
                className="cursor-pointer hover:scale-110 transition-transform"
              />
              <span className="hidden sm:block font-forumNormal font-bold text-sm text-gray-600">Menu</span>
              </div>
            ) : (
              <div className='flex flex-col items-center'>
              <User
                size={24}
                // onClick={toggleMenu}
                onClick={() => setSidebarOpen(true)}
                className="cursor-pointer hover:scale-110 transition-transform"
              />
              <span className="hidden sm:block font-forumNormal font-bold text-xs text-gray-600">Account</span>
             
              </div>
            )}
           
          </div>

          {/* Center Logo */}
          <div className="flex-1 text-center">
            <Link to="/" className="text-xl md:text-2xl font-semibold font-forumNormal">
              Abhinav's Best of World
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-5">
            <Link to="/wish-list">
              <div className="flex flex-col items-center">
                <Heart 
                  size={24} 
                  className="cursor-pointer hover:scale-110 transition-transform"
                />
                <span className="hidden sm:block font-forumNormal font-bold text-xs text-gray-600">Wishlist</span>
              </div>
            </Link>

            <div className="relative">
              <div className="flex flex-col items-center">
                <ShoppingCart
                  size={24}
                  onClick={toggleCart}
                  className="cursor-pointer hover:scale-110 transition-transform"
                />
                 <span className="hidden sm:block font-forumNormal font-bold text-xs text-gray-600">Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Component */}
      <HeaderSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isLoggedIn={isLoggedIn}
        handleLogout={handleLogout}
      />
      </div>

        {/* Dropdown Menu
        {menuOpen && (
          <div
            ref={menuRef}
            className="absolute left-4 top-16 z-20 w-48 bg-headerBackGround border border-gray-300 rounded-lg shadow-lg"
          >
            <ul className="py-2">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-300 transition-colors">
                      <LogIn size={16} className="mr-2" />
                      <span>Log In</span>
                    </li>
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)}>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-300 transition-colors">
                      <UserPen size={16} className="mr-2" />
                      <span>Register</span>
                    </li>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/user-profile" onClick={() => setMenuOpen(false)}>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-300 transition-colors">
                      <User size={16} className="mr-2" />
                      <span>Profile</span>
                    </li>
                  </Link>
                  <Link to="/order-history" onClick={() => setMenuOpen(false)}>
                    <li className="flex items-center px-4 py-2 hover:bg-gray-300 transition-colors">
                      <Package size={16} className="mr-2" />
                      <span>My Orders</span>
                    </li>
                  </Link>
                  <li 
                    className="flex items-center px-4 py-2 hover:bg-gray-300 transition-colors cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} className="mr-2" />
                    <span>Log out</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
      </div> */}


    

      {/* Cart Panel - Sliding from right */}
      <Dialog open={cartOpen} onClose={setCartOpen} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-[3px] transition-opacity duration-300 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 font-forumNormal overflow-hidden">
          <div className="absolute inset-0 z-30 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full md:pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-2xl font-medium text-gray-900">Cart Items</DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setCartOpen(false)}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="size-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
  <div className="flow-root">
    <ul role="list" className="-my-6 divide-y divide-gray-200">
      {cartItems.length === 0 ? (
        <div className=' mt-48 justify-center text-center'>No products found</div>
      ) : (
        cartItems.map((item) => (
          <li key={item._id} className="flex py-6">
            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
            
  {/* <img
    className="h-28 w-28"
    src={
      Array.isArray(item.images)
        ? item.images[0] // Use the first image if `images` is an array
        : item.images || item.image // Use `images` or `image` if it's a string
    }
    alt={item.name}
  /> */}

              <img
                alt={item.name}
                src={
                  Array.isArray(item.images)
                    ? item.images[0] // Use the first image if `images` is an array
                    : item.images || item.image // Use `images` or `image` if it's a string
                }
                className="size-full object-cover"
              />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <a href={item.href}>{item.name}</a>
                  </h3>
                  <p className="ml-4">₹{item.price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{item.color}</p>
              </div>
              <div className="flex flex-1 items-end justify-between text-sm">
                <p className="text-gray-500">Qty: {item.quantity}</p>

                <div className="flex">
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(isLoggedIn ? item.product?._id : item.product)}
                    
                    className="font-medium cursor-pointer text-red-500 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))
      )}
    </ul>
  </div>
</div>
</div>


                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p className='font-semibold'>₹{subtotal}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <Link to="/cart"
                        onClick={() => setCartOpen(false)}
                        className="flex items-center justify-center text-xl border border-transparent bg-homePage px-6 py-3 font-medium text-white shadow-sm hover:bg-[#0f302f]"
                      >
                        Checkout
                      </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <Link to="/shop">
                        <button
                          type="button"
                          onClick={() => setCartOpen(false)}
                          className="font-bold text-gray-500 hover:text-gray-900"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button></Link>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>

    </header>
  );
};

export default Header;



