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
import SearchComponent from './SearchComponent';

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
  const [searchQuery, setSearchQuery] = useState('');
const [searchRecommendations, setSearchRecommendations] = useState([]);

const handleSearchInputChange = (query) => {
  if (!query) {
    setSearchRecommendations([]);
    return;
  }
  
  const firstChar = query.toLowerCase().charAt(0);
  
  // Dictionary of recommendations based on first letter
  const suggestionMap = {
    't': [
      { type: 'category', name: 'T-Shirts', path: '/shop/Tshirt' },
     
    ],
    'o': [
      { type: 'category', name: 'Oversized', path: '/shop/Oversize-Tshirt' },
      
    ],
    'd': [
      { type: 'tag', name: 'DC', path: '/shop/tag/dc' },
      { type: 'tag', name: 'Denim', path: '/shop/category/disney' },
    ],
    'h': [
      { type: 'category', name: 'Hoodies', path: '/shop/hoodies' },
    ],
    'c': [
      { type: 'category', name: 'Hoodies', path: '/shop/hoodies' },
    ],
    's': [
      { type: 'category', name: 'Shorts', path: '/shop/category/shorts' },
      { type: 'tag', name: 'Summer', path: '/shop/tag/summer' },
    ],
  };
  
  // Get recommendations for the first letter
  let matchingItems = suggestionMap[firstChar] || [];
  
  // If typing more than one character, filter further
  if (query.length > 1) {
    matchingItems = matchingItems.filter(item => 
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  setSearchRecommendations(matchingItems);
};

const handleSearch = (e) => {
  if (e.key === 'Enter' && searchQuery) {
    // Navigate to search results page
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchOpen(false);
  }
};


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
      path: "/shop/hoodies", 
      image: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/26bdc010-eeb7-448b-9adf-a466a614143c_WhatsApp%20Image%202025-02-12%20at%203.53.09%20PM%20%282%29.jpeg" // Use actual image path in production
    },
    { 
      name: "T-Shirts", 
      path: "/shop/Tshirt", 
      image: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/a58b3d3a-77b9-4b89-aea4-cff08c5eff7d_WhatsApp%20Image%202025-03-28%20at%202.12.08%20PM%20%289%29.jpeg" // Use actual image path in production
    },
    { 
      name: "Oversize-Tshirt", 
      path: "/shop/Oversize-Tshirt", 
      image: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/aaa98ecb-1dec-45a0-a131-ba0caaa25ab5_WhatsApp%20Image%202025-03-02%20at%205.21.07%20PM%20%2813%29.jpeg" // Use actual image path in production
    },
    { 
      name: "Holi-Special", 
      path: "/shop/Holi-Special", 
      image: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/3a290076-1db2-428c-b055-d73846be213c_WhatsApp%20Image%202025-03-10%20at%2012.57.31%20PM%20%2821%29.jpeg" // Use actual image path in production
    },
    { 
      name: "Doraemon Collection", 
      path: "/shop/tag/doraemon", 
      image: "https://www.swagshirts99.com/wp-content/uploads/2020/02/4F1E4FBE-F286-4CDE-86A6-707CDCEB5EF3-356x442.jpeg" // Use actual image path in production
    },
    
  ];

  // Latest featured items (similar to music in the reference design)
  const featuredItems = [
    {
      name: "Hoodies",
      path: "/shop/hoodies", 
      brand: "Casual Vibes",
      image: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/26bdc010-eeb7-448b-9adf-a466a614143c_WhatsApp%20Image%202025-02-12%20at%203.53.09%20PM%20%282%29.jpeg" 
    },
    {
      name: "Oversized Tees",
      path: "/shop/Oversize-Tshirt", 
      brand: "Casual Wear",
        image: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/aaa98ecb-1dec-45a0-a131-ba0caaa25ab5_WhatsApp%20Image%202025-03-02%20at%205.21.07%20PM%20%2813%29.jpeg"
    },
    {
      name: "Typography",
      path: "/shop/tag/typography", 
      brand: "Fonts that flex",
      image: "https://images.bewakoof.com/t640/women-s-black-friends-typography-boyfriend-t-shirt-234669-1715257520-1.jpg"
    },
    
    {
      name: "Spider-Man",
      path: "/shop/tag/spiderman", 
      brand: "Spider Man",
      image: "https://images.bewakoof.com/t640/men-s-red-friendly-neighbour-graphic-printed-oversized-t-shirt-660978-1738573645-1.jpg"
    },
    
    {
      name: "Couple Tees",
      path: "/shop/Couple-Tshirt", 
      brand: "Love in Style",
      image: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/1cf70a61-eb1c-48df-aa6e-06ce26403002_WhatsApp%20Image%202025-02-28%20at%202.41.51%20PM%20%281%29.jpeg"
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
            <a href="/" className="text-xl md:text-2xl font-semibold font-forumNormal">
              Abhinav's Best of World
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center  gap-x-5">
            {/* Search Icon */}
            
            <SearchComponent/>
            
            
            <Link to="/wish-list" className="hidden sm:block">
  <div className="flex flex-col items-center">
    <Heart 
      size={24} 
      className="cursor-pointer hover:scale-110 transition-transform"
    />
    
    <span className="font-forumNormal font-bold text-xs text-gray-600">Wishlist</span>
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
