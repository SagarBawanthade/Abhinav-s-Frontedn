import { useEffect, useRef, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import { FaHeart } from "react-icons/fa";
import { useLocation } from 'react-router-dom';

const WishList = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Unisex Snowman Hoodie',
      price: 1000,
      color: 'Red',
      size: 'L',
      image: '/images/shoplogo.jpg',
    },
    {
      id: 2,
      name: 'Unisex Lavender Edition Hoodies',
      price: 500,
      color: 'Blue',
      size: 'M',
      image: '/images/shoplogo.jpg',
    },
  ]);

  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, [location]);
  

  // Function to handle deleting a wishlist item
  const handleDelete = (itemId) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== itemId));
  };

  const wishlistRef = useRef(null);

  // Adjusting scroll behavior to position at the top of the wishlist section
  useEffect(() => {
    if (wishlistRef.current) {
      window.scrollTo({
        top: wishlistRef.current.offsetTop - 50,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <section ref={wishlistRef} className="bg-headerBackGround py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className='flex font-forumNormal text-center'>
             <h2 className="font-forumNormal text-gray-900 dark:text-white text-3xl mr-3">My WishList</h2>
        <FaHeart icon="fa-solid fa-heart" className="mt-1" style={{fontSize:"28px" ,color:"red"}} />
        </div>
       
      


        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6 font-forumNormal">
              {/* Map through wishlist items */}
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="relative rounded-lg border border-gray-300 bg-headerBackGround p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                >
                  <div className="space-y-4 md:flex md:items-center md:gap-6 md:space-y-0">
                    <a href="#" className="shrink-0 md:order-1">
                      <img className="h-28 w-28" src={item.image} alt={item.name} />
                    </a>

                    <div className="text-end md:order-3 justify-center md:w-32">
                      <p className="text-xl font-forumNormal font-semibold text-gray-900 dark:text-white">₹{item.price}</p>
                    </div>

                    <div className="w-full min-w-0 flex-1 justify-center space-y-4 md:order-2 md:max-w-md">
                      <p className="text-2xl font-forumNormal text-gray-900 hover:underline dark:text-white">{item.name}</p>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <p className='text-black text-lg font-forumNormal'>Color: <span className="font-forumNormal text-black">{item.color}</span></p>
                        <p className='font-forumNormal text-black text-lg'>Size: <span className="font-forumNormal text-black">{item.size}</span></p>
                      </div>
                    </div>

                    {/* Delete button positioned bottom-right */}
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="absolute bottom-2 right-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-500"
                    >
                      <FaTrashAlt className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishList;
