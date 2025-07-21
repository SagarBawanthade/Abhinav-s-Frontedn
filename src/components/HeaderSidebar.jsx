import { useState, useEffect } from 'react';
import { 
  User, LogOut, LogIn, Package, UserPen, 
  Heart, Home, Gift, 
  Truck, BadgePercent, ShieldAlert,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const HeaderSidebar = ({ isOpen, onClose, isLoggedIn, handleLogout }) => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [sparklePosition, setSparklePosition] = useState({ x: 0, y: 0 });
 
  useEffect(() => {
    // Add click event listener to close sidebar when clicking outside
    const handleOutsideClick = (event) => {
      if (isOpen && event.target.closest('.sidebar') === null) {
        onClose();
      }
    };

    // Add event listener when sidebar is open
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isButtonHovered) {
      const interval = setInterval(() => {
        setSparklePosition({
          x: Math.random() * 100,
          y: Math.random() * 100,
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isButtonHovered]);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-gray-900/100 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-50 visible z-50' : 'opacity-0 invisible pointer-events-none z-0'
        }`} 
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`sidebar font-forumNormal fixed top-0 left-0 h-full bg-headerBackGround shadow-2xl transform transition-transform duration-500 ease-in-out 
          w-[280px] md:w-[350px] z-[51] ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Sidebar Header with welcome message */}
        <div className="bg-gradient-to-r from-gray-600 to-gray-700 text-headerBackGround p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Welcome{isLoggedIn ? '!' : ' Back'}</h2>
              <p className="text-gray-100 mt-1">
                {isLoggedIn ? 'Happy shopping!' : 'Sign in for the best experience'}
              </p>
            </div>
          </div>
        </div>

        {/* Rest of the sidebar content remains the same as in the previous implementation */}
        {/* ... (previous content) ... */}
         {/* Sidebar Content */}
                <div className="overflow-y-auto h-[calc(100vh-140px)]">
                  {/* Quick Links Section */}
                  <div className="p-4 border-b border-gray-100">
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { icon: Home, label: 'Home', to: '/' },
                        { icon: Heart, label: 'Wishlist', to: '/wish-list' },
                        { icon: Package, label: 'Orders', to: '/order-history' }
                      ].map((item, index) => (
                        <Link 
                          key={index} 
                          to={item.to} 
                          onClick={onClose}
                          className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 transition-all duration-200"
                        >
                          <item.icon size={20} className="text-gray-600 mb-1" />
                          <span className="text-sm text-gray-600">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
        
                  {/* Shop Now Button */}
                  <div className="px-4 py-2">
                    <Link 
                      to="/shop" 
                      onClick={onClose}
                      onMouseEnter={() => setIsButtonHovered(true)}
                      onMouseLeave={() => setIsButtonHovered(false)}
                      className="relative block"
                    >
                      {/* Button content remains the same as in previous code */}
                      {/* ... (previous Shop Now button code) ... */}
                    </Link>
                  </div>
        
                  {/* Main Navigation */}
                  <nav className="p-4">
                    <div className="space-y-6">
                    <div>
  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-4">
    New Clothing
  </h3>
  <ul className="space-y-1">
    {[
        { 
          img: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/6afaae3e-165f-4346-ab5b-f39a86eb2ff9_WhatsApp%20Image%202025-03-24%20at%201.57.18%20PM%20%289%29.jpeg", 
          label: 'T-Shirts', 
          to: '/shop/Tshirt' 
        },
        { 
          img: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/99f749c6-38de-419e-b722-dedbb8f67009_WhatsApp%20Image%202025-05-13%20at%206.41.18%20PM%20%281%29.jpeg", 
          label: 'Polo T-Shirts', 
          to: '/shop/Polo-Tshirt' 
        },
      { 
        img: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/ea08474e-fe47-471c-a3f9-040aea4cf53d_K3.jpeg", 
        label: 'Solid Color T-Shirt & Oversized', 
        to: '/shop/Solid Color T-Shirt & Oversized' 
      },
      { 
        img: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/d8528151-fd26-40c3-9aab-10398aeb2eb5_WhatsApp%20Image%202025-04-01%20at%208.30.40%20PM.jpeg", 
        label: 'Oversize T-Shirts', 
        to: '/shop/Oversize-Tshirt' 
      },
     
    
      { 
        img: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/1cf70a61-eb1c-48df-aa6e-06ce26403002_WhatsApp%20Image%202025-02-28%20at%202.41.51%20PM%20%281%29.jpeg", 
        label: 'Couple T-Shirts', 
        to: '/shop/Couple-Tshirt' 
      },
    
      
      { 
        img: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/26bdc010-eeb7-448b-9adf-a466a614143c_WhatsApp%20Image%202025-02-12%20at%203.53.09%20PM%20%282%29.jpeg", 
        label: 'Hoodies', 
        to: '/shop/hoodies' 
      },
      { 
        img: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/3a290076-1db2-428c-b055-d73846be213c_WhatsApp%20Image%202025-03-10%20at%2012.57.31%20PM%20%2821%29.jpeg", 
        label: 'Holi-Special', 
        to: '/shop/Holi-Special' 
      },
    ].map((item, index) => (
      <Link 
        key={index} 
        to={item.to} 
        onClick={onClose}
      >
        <li className="group p-4 rounded-xs hover:bg-gray-50 transition-all duration-200 cursor-pointer">
          <div className="flex items-center space-x-4">
            <img
              src={item.img}
              alt={item.label}
              className="w-6 h-6 object-cover rounded-md group-hover:scale-110 transition-all duration-200" 
            />
            <span className="text-gray-700 group-hover:text-gray-600 font-medium">
              {item.label}
            </span>
          </div>
        </li>
      </Link>
    ))}
  </ul>
</div>
        
                      {/* Previous sections (Account, Shopping, Help) remain the same */}
                      {/* Account Section */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-4">
                          Account
                        </h3>
                        <ul className="space-y-1">
                          {!isLoggedIn ? (
                            <>
                              <Link to="/login" onClick={onClose}>
                                <li className="group p-4 rounded-lg hover:bg-blue-50 transition-all duration-200 cursor-pointer">
                                  <div className="flex items-center space-x-4">
                                    <LogIn 
                                      size={22} 
                                      className="text-gray-600 group-hover:scale-110 transition-all duration-200" 
                                    />
                                    <span className="text-gray-700 group-hover:text-gray-600 font-medium">
                                      Login
                                    </span>
                                  </div>
                                </li>
                              </Link>
        
                              <Link to="/register" onClick={onClose}>
                                <li className="group p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                                  <div className="flex items-center space-x-4">
                                    <UserPen 
                                      size={22} 
                                      className="text-gray-600 group-hover:scale-110 transition-all duration-200" 
                                    />
                                    <span className="text-gray-700 group-hover:text-gray-600 font-medium">
                                      Register
                                    </span>
                                  </div>
                                </li>
                              </Link>
                            </>
                          ) : (
                            <>
                              <Link to="/user-profile" onClick={onClose}>
                                <li className="group p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                                  <div className="flex items-center space-x-4">
                                    <User 
                                      size={22} 
                                      className="text-gray-600 group-hover:scale-110 transition-all duration-200" 
                                    />
                                    <span className="text-gray-700 group-hover:text-gray-600 font-medium">
                                      Profile
                                    </span>
                                  </div>
                                </li>
                              </Link>
                            </>
                          )}
                        </ul>
                      </div>
        
                      {/* Shopping Section */}
                      <div>
                        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-4">
                          Shopping
                        </h3>
                        <ul className="space-y-1">
                          {[
                            { icon: Gift, label: 'Deals', to: '/deals', comingSoon: true },
                            { icon: BadgePercent, label: 'Offers', to: '/shop/Tshirt', comingSoon: false },
                            { icon: Truck, label: 'Track Order', to: '/order-history', comingSoon: false },
                          ].map((item, index) => (
                            <Link 
                              key={index} 
                              to={item.comingSoon ? '#' : item.to} 
                              onClick={!item.comingSoon ? onClose : undefined}
                            >
                              <li 
                                className={`group p-4 rounded-lg transition-all duration-200 cursor-pointer ${
                                  item.comingSoon ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                                }`}
                              >
                                <div className="flex items-center justify-between space-x-4">
                                  <div className="flex items-center space-x-4">
                                    <item.icon 
                                      size={22} 
                                      className="text-gray-600 group-hover:scale-110 transition-all duration-200" 
                                    />
                                    <>
 
  <span className="text-gray-700 group-hover:text-gray-600 font-medium opacity-50 cursor-not-allowed">
    {item.label}
  </span>
</>
                                  </div>
                                  {item.comingSoon && (
                                    <span className="text-xs text-gray-500 font-semibold uppercase">
                                      Coming Soon
                                    </span>
                                  )}
                                </div>
                              </li>
                            </Link>
                          ))}
                        </ul>
                      </div>
        
                      {/* Help Section */}
                      <div className="border-t border-gray-100 pt-4">
                        <Link to="/privacy" onClick={onClose}>
                          <div className="group p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer">
                            <div className="flex items-center space-x-4">
                              <ShieldAlert  
                                size={22} 
                                className="text-gray-600 group-hover:scale-110 transition-all duration-200" 
                              />
                              <span className="text-gray-700 group-hover:text-gray-600 font-medium">
                               Privacy Policy
                              </span>
                            </div>
                          </div>
                        </Link>
        
                        {isLoggedIn && (
                          <div 
                            onClick={() => {
                              handleLogout();
                              onClose();
                            }}
                            className="group p-4 rounded-lg hover:bg-red-50 transition-all duration-200 cursor-pointer"
                          >
                            <div className="flex items-center space-x-4">
                              <LogOut 
                                size={22} 
                                className="text-red-500 group-hover:scale-110 transition-all duration-200" 
                              />
                              <span className="text-gray-700 group-hover:text-red-600 font-medium">
                                Logout
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
     
    </>
  );
};

export default HeaderSidebar;