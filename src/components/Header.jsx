import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector , useDispatch} from 'react-redux';
import { logout } from '../feature/authSlice';
import { toast } from "react-toastify";



const Header = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); 
  const menuRef = useRef(null); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get authentication state from Redux store
  const { id, token , role} = useSelector((state) => state.auth);
  const products = [
    {
      id: 1,
      name: 'Unisex Snowman Hoodie',
      href: '#',
      color: 'White',
      price: '₹999.00',
      quantity: 2,
      imageSrc: '/images/shoplogo.jpg',
      imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
      id: 2,
      name: 'Unisex Lavender Edition Hoodie',
      href: '#',
      color: 'Lavender',
      price: '₹1299.00',
      quantity: 1,
      imageSrc: '/images/AWESOME 1.jpg',
      imageAlt:
        'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
  ];

  const handleLogout = () => {
   
    dispatch(logout(id, token ));
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu visibility
  };

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
  }, []); // Empty dependency array to run this effect once on mount

  return (
    <header href="/" className="text-allFontColor bg-headerBackGround flex items-center justify-between px-8 py-4 md:py-6  shadow-lg font-avenir">
      {/* Left: Logo */}
      <div className="logo">
        <Link to="/" className="text-left text-xl
        md:text-xl lg:text-2xl font-forumNormal">
          Abhinav's Best of World
        </Link>
      </div>

      {/* Right: Navigation Icons */}
      <div className="ml-3 nav-items flex gap-5 relative">

      <Link to="/wish-list"><FavoriteBorderIcon sx={{ color:"red" ,fontSize: { xs: 24, sm: 30 },fontWeight: 'normal', }} className="cursor-pointer hover:scale-110 transition-transform"/></Link> 
       <ShoppingCartOutlinedIcon
          onClick={toggleCart}
          sx={{
            fontSize: { xs: 24, sm: 30 },
            fontWeight: 'normal',
          }}
          className="cursor-pointer hover:scale-110 transition-transform"
        />
       
        {/* Menu Icon - Toggles Dropdown */}
        <MenuIcon
          onClick={toggleMenu}
          sx={{
            fontSize: { xs: 24, sm: 30 },
            fontWeight: 'normal',
          }}
          className="cursor-pointer hover:scale-110 transition-transform"
        />
       {menuOpen && (
          <div ref={menuRef} className="absolute right-0 z-20 mt-2 w-40 font-semibold border border-gray-300 rounded-lg font-forumNormal bg-headerBackGround">
            <ul className="py-2 text-gray-700">
              {!id && !token && ( // If user is not logged in
                <>
                  <Link to="/register">
                    <li>
                      <a href="#" className="flex items-center justify-between px-3 py-2 text-sm hover:bg-gray hover:text-black hover:bg-gray-300 transition duration-300">
                        <span>Register</span>
                      </a>
                    </li>
                  </Link>
                  <Link to="/login">
                    <li>
                      <a href="#" className="flex items-center justify-between px-4 py-3 text-sm hover:text-black hover:bg-gray-300 transition duration-300">
                        <span>Log In</span>
                      </a>
                    </li>
                  </Link>
                </>
              )}
              {id && token && ( // If user is logged in
                <>
                  <Link to="/user-profile">
                    <li>
                      <a href="#" className="flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-300 hover:text-black transition duration-300">
                        <span>Profile</span>
                      </a>
                      <hr className="border-thin border-gray-300"/>
                    </li>
                  </Link>
                  <Link to="/">
                    <li>
                      <a
                        href="#"
                        className="flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-300 hover:text-gray-900 transition duration-300"
                        onClick={handleLogout}
                      >
                        <span>Log out</span>
                      </a>
                    </li>
                  </Link>
                </>
              )}
              
            </ul>
          </div>
        )}
      </div>

    

      {/* Cart Panel - Sliding from right */}
      <Dialog open={cartOpen} onClose={setCartOpen} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 font-forumNormal overflow-hidden">
          <div className="absolute inset-0 z-30 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
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
                          {products.map((product) => (
                            <li key={product.id} className="flex py-6">
                              <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img alt={product.imageAlt} src={product.imageSrc} className="size-full object-cover" />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href={product.href}>{product.name}</a>
                                    </h3>
                                    <p className="ml-4">{product.price}</p>
                                  </div>
                                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">Qty {product.quantity}</p>

                                  <div className="flex">
                                    <button type="button"  onClick={() => setCartOpen(false)} className="font-medium text-red-500 hover:text-red-800">
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p className='font-semibold'>₹262.00</p>
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



