import { useEffect, useRef} from 'react';
import { FaTrashAlt } from 'react-icons/fa';

import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { removeFromWishlist } from "../feature/wishlistSlice";

import { toast } from 'react-toastify';

const WishList = () => {

    
  const location = useLocation();
  
  useEffect(() => {
    
    window.scrollTo(0, 0); // Scroll to top of the page
  }, [location]);

  const wishlist = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();

 console.log(wishlist);

 useEffect(() => {
 
}, [wishlist]);


  

  // Function to handle deleting a wishlist item
  const handleDelete = (productId) => {
    console.log(productId);
    dispatch(removeFromWishlist(productId));
   toast.success('Item removed from wishlist');

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
       
      
        {wishlist.length === 0 ? <p className='text-center justify-center mt-10 font-forumNormal text-xl font-semibold'>No items in wishlist</p> : (

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6 font-forumNormal">
              {/* Map through wishlist items */}
              {wishlist.map((item) => (
                <div
                  key={item._id}
                  className="relative rounded-lg border border-gray-300 bg-headerBackGround p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                >
                  <div className="space-y-4 md:flex md:items-center md:gap-6 md:space-y-0">
                     <Link to={`/product-details/${item._id}`} className="shrink-0 md:order-1">
                      <img className="h-28 w-28" src={item.images[0]} alt={item.name} />
                    </Link>

                    <div className="text-end md:order-3 justify-center md:w-32">
                      <p className="text-xl font-forumNormal font-semibold text-gray-900 dark:text-white">₹{item.price}</p>
                    </div>

                    <div className="w-full min-w-0 flex-1 justify-center space-y-4 md:order-2 md:max-w-md">
                      <Link to={`/product-details/${item._id}`}>
                      <p className="text-2xl font-forumNormal text-gray-900 hover:underline dark:text-white">{item.name}</p></Link>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        
                      </div>
                    </div>

                    {/* Delete button positioned bottom-right */}
                    <button
                      type="button"
                      onClick={() => handleDelete(item._id)}
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
        )}
      </div>
    </section>
  );
};

export default WishList;
