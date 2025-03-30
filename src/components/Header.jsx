import { ShoppingCart, Search, Heart, User } from 'lucide-react';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../feature/authSlice';
import { toast } from 'react-toastify';
import { fetchCartItems, removeFromLocalCart, removeItemFromCart } from '../feature/cartSlice';
import { persistor } from '../utils/store';
import HeaderSidebar from './HeaderSidebar';

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const menuRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
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
    dispatch(logout(id, token));
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

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen && searchInputRef.current) {
      // Focus the search input after animation completes
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 300);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      // Implement search functionality here
      const searchTerm = e.target.value;
      if (searchTerm.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
        setSearchOpen(false);
      }
    }
  };

  useEffect(() => {
    // Close the menu and search if clicked outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target) && 
          !event.target.classList.contains('search-icon')) {
        setSearchOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cartItems]);

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

  // Category data with images for the search section
  const categories = [
    { 
      name: "Hoodies", 
      path: "/shop/clothing", 
      image: "/api/placeholder/120/120" // Use actual image path in production
    },
    { 
      name: "T-Shirts", 
      path: "/shop/accessories", 
      image: "/api/placeholder/120/120" // Use actual image path in production
    },
    { 
      name: "Pants", 
      path: "/shop/footwear", 
      image: "/api/placeholder/120/120" // Use actual image path in production
    },
    { 
      name: "Shoes", 
      path: "/shop/new-arrivals", 
      image: "/api/placeholder/120/120" // Use actual image path in production
    },
    { 
      name: "Men's Wear", 
      path: "/shop/new-arrivals", 
      image: "/api/placeholder/120/120" // Use actual image path in production
    },
    {
      name: "Women's Wear",
      path: "/shop/new-arrivals",
      image: "/api/placeholder/120/120" // Use actual image path in production
    },
  ];

  // Latest featured items (similar to music in the reference design)
  const featuredItems = [
    {
      name: "Hoodies",
      brand: "Casual Vibes",
      image: "https://images.bewakoof.com/t640/men-s-blue-oversized-hoodies-620452-1722259006-1.jpg"
    },
    {
      name: "Oversized Tees",
      brand: "Casual Wear",
      image: "../public/images/2.jpg"
    },
    {
      name: "Typography Tees",
      brand: "Fonts that flex",
      image: "https://images.bewakoof.com/t1080/men-s-white-introvert-typography-oversized-t-shirt-611250-1741259217-1.jpg"
    },
    
    {
      name: "Cargo Pants",
      brand: "Urban Edge",
      image: "https://images.bewakoof.com/t640/men-s-jet-black-cargo-pants-648623-1740642840-1.jpg"
    },
    {
      name: "Baggy Jeans",
      brand: "Modern Drip",
      image: "https://images.bewakoof.com/t640/men-s-olive-green-wide-leg-acid-wash-jeans-652464-1741369143-1.jpg"
    },
    {
      name: "Couple Tees",
      brand: "Love in Style",
      image: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/1cf70a61-eb1c-48df-aa6e-06ce26403002_WhatsApp%20Image%202025-02-28%20at%202.41.51%20PM%20%281%29.jpeg"
    }
  ];

  // Recent viewed items (similar to recent songs in reference)
  const recentItems = [
    {
      name: "Shirt",
      brand: "Classic Checks",
      image: "https://images.bewakoof.com/t640/men-s-beige-checked-oversized-shirt-651169-1734610849-1.jpg",
      collection: "Casual Collection"
    },
    {
      name: "Jeans",
      brand: "Denim Delight",
      image: "https://images.bewakoof.com/t640/men-s-light-blue-relaxed-fit-jeans-651172-1731677401-1.jpg",
      collection: "Denim Collection"
    },
    {
      name: "Oversized T-shirt",
      brand: "Street Style",
      image: "https://images.bewakoof.com/t640/men-s-green-contestants-graphic-printed-oversized-t-shirt-659561-1735823527-1.jpg",
      collection: "Urban Collection"
    }
  ];

  return (
    <header className="bg-headerBackGround text-allFontColor shadow-lg">
      <div className="max-w-[91rem] mx-auto px-5 py-5">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center">
            {!isLoggedIn ? (
              <div className='flex flex-col items-center'>
                <MenuIcon 
                  onClick={() => setSidebarOpen(true)}
                  className="cursor-pointer hover:scale-110 transition-transform"
                />
                <span className="hidden sm:block font-forumNormal font-bold text-sm text-gray-600">Menu</span>
              </div>
            ) : (
              <div className='flex flex-col items-center'>
                <User
                  size={24}
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
            {/* Search Icon */}
            <div className="flex flex-col items-center">
              <Search 
                size={24}
                className="cursor-pointer hover:scale-110 transition-transform search-icon"
                onClick={toggleSearch}
              />
              <span className="hidden sm:block font-forumNormal font-bold text-xs text-gray-600">Search</span>
            </div>
            
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

        {/* Search Bar - Animated with updated design */}
        <div 
          ref={searchRef}
          className={`fixed inset-0 bg-white bg-opacity-95 z-50 flex items-start justify-center transition-all duration-300 ease-in-out ${
            searchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{ 
            paddingTop: '100px',
            backdropFilter: 'blur(5px)'
          }}
        >
          <div className="w-full max-w-4xl px-6 transition-transform duration-300 transform" 
            style={{ 
              transform: searchOpen ? 'translateY(0)' : 'translateY(-20px)',
            }}
          >
            <div className="relative">
              <div className="flex items-center border-b-2 border-gray-300 pb-4">
                <Search size={24} className="text-gray-500 mr-4" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for Hoodies, T-Shirts and more..."
                  className="w-full text-xl md:text-2xl outline-none bg-transparent font-forumNormal"
                  onKeyDown={handleSearch}
                />
                <XMarkIcon 
                  className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-800"
                  onClick={() => setSearchOpen(false)}
                />
              </div>
              
              {/* Latest Section - Similar to the reference image */}
              <div className="mt-8">
                <h3 className="text-2xl font-medium text-gray-700 mb-6 font-forumNormal">Latest</h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                  {featuredItems.map((item, index) => (
                    <Link key={index} className="flex flex-col items-center">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden mb-2">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.brand}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent Section - Similar to the reference image */}
              <div className="mt-12">
                <h3 className="text-2xl font-medium text-gray-700 mb-6 font-forumNormal">Recent</h3>
                <div className="space-y-4">
                  {recentItems.map((item, index) => (
                    <Link key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.brand}</p>
                        </div>
                      </div>
                      <div className="text-gray-500">
                        <p>{item.collection}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories as simple text links */}
              <div className="mt-8 hidden md:block">
                <h3 className="text-lg font-medium text-gray-700 mb-4 font-forumNormal">Browse Categories</h3>
                <div className="flex flex-wrap gap-4">
                  {categories.map((category, index) => (
                    <Link 
                      key={index}
                      to={category.path} 
                      className="p-3 bg-gray-100 rounded text-center hover:bg-gray-200 transition-colors" 
                      onClick={() => setSearchOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
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
