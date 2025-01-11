import { useState, useEffect } from 'react';
import { 
  User, LogOut, LogIn, Package, UserPen, X, 
   Heart, Home, Gift,
  Truck,  BadgePercent, ShieldAlert ,
  ShoppingBag, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';


const HeaderSidebar = ({ isOpen, onClose, isLoggedIn, handleLogout }) => {

   // ADD NEW STATE FOR BUTTON ANIMATION
   const [isButtonHovered, setIsButtonHovered] = useState(false);
   const [sparklePosition, setSparklePosition] = useState({ x: 0, y: 0 });
 
   // ADD SPARKLE ANIMATION EFFECT
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
        className={`font-forumNormal  fixed top-0 left-0 h-full bg-headerBackGround shadow-2xl transform transition-transform duration-500 ease-in-out 
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
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
              aria-label="Close menu"
            >
              <X size={24} className="text-white" />
            </button>
          </div>
        </div>

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

              <div className="px-4 py-2">
  <Link 
    to="/shop" 
    onClick={onClose}
    onMouseEnter={() => setIsButtonHovered(true)}
    onMouseLeave={() => setIsButtonHovered(false)}
    className="relative block"
  >
    <div className="relative overflow-hidden group">
      {/* Button Container */}
      <div className={`
        relative overflow-hidden
  bg-gradient-to-r from-slate-600 to-blue-600
      hover:from-slate-700 to-blue-700
        rounded-xl
        transition-all duration-500 ease-out
        ${isButtonHovered ? 'transform translate-y-[-2px]' : ''}
      `}>
        {/* Ripple effect background */}
        <div className={`
          absolute inset-0
          bg-gradient-to-r from-blue-400/20 to-purple-400/20
          transform scale-x-0 group-hover:scale-x-100
          transition-transform duration-700 ease-out
          origin-left
        `} />

        {/* Button Content */}
        <div className="relative p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <ShoppingBag className={`
                  w-6 h-6 text-white
                  transition-all duration-500
                  ${isButtonHovered ? 'transform rotate-12 scale-110' : ''}
                `} />
                <Sparkles className={`
                  absolute -top-1 -right-1 w-3 h-3 text-yellow-300
                  transition-all duration-300
                  ${isButtonHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
                `} />
              </div>
              <span className="text-lg font-semibold text-white">
                Shop Now
              </span>
            </div>
            
            <div className={`
              flex items-center space-x-2 text-white
              transform transition-all duration-500
              ${isButtonHovered ? 'translate-x-1' : ''}
            `}>
              <span className="text-sm opacity-75">Explore</span>
              <span className={`
                transform transition-all duration-500
                ${isButtonHovered ? 'translate-x-1 rotate-45' : ''}
              `}>→</span>
            </div>
          </div>

          {/* Pulse Effect */}
          <div className={`
            absolute inset-0 rounded-xl
            border-2 border-white/20
            transition-all duration-1000
            ${isButtonHovered ? 'scale-105 opacity-0' : 'scale-100 opacity-100'}
          `} />
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className={`
        absolute inset-x-0 bottom-0 h-1/2
        bg-gradient-to-t from-blue-500/20 to-transparent
        transform transition-transform duration-500
        ${isButtonHovered ? 'translate-y-1' : 'translate-y-full'}
        rounded-b-xl
      `} />
    </div>

    {/* Mobile Enhancement */}
    <div className="mt-1 text-center">
      <span className="text-xs text-gray-500 md:hidden">
        Tap to explore our collection
      </span>
    </div>
  </Link>
</div>


          {/* Main Navigation */}
          <nav className="p-4">
            <div className="space-y-6">
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
      { icon: BadgePercent, label: 'Offers', to: '/offers', comingSoon: true },
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
              <span className="text-gray-700 group-hover:text-gray-600 font-medium">
                {item.label}
              </span>
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