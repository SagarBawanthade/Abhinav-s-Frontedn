import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { useEffect, useState } from 'react';
import { removeFromWishlist, addToWishlist  } from "../feature/wishlistSlice";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom';
import { Tag, Heart, Clock } from 'lucide-react';

function MoreProduct3() {
  const [products, setProducts] = useState([]);

  const wishlist = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();


  const isProductInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId);
  };
  
  // Modify your toggleLike function:
  const toggleLike = (item) => {
    if (isProductInWishlist(item._id)) {
      dispatch(removeFromWishlist(item._id));
      toast.success("Product removed from Wishlist!");
    } else {
      dispatch(addToWishlist(item));
      toast.success("Product Added to Wishlist!");
    }
  };

  
  useEffect(() => {
    fetch('https://backend.abhinavsofficial.com/api/product/getproducts')
      .then((response) => response.json())
      .then((data) => {
        // Sort products in descending order based on _id or createdAt (or any other field you prefer)
        const sortedProducts = data.sort((a, b) => {
          return b._id.localeCompare(a._id); // Sorting by _id in descending order
        });
        setProducts(sortedProducts);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);


  return (
    <div className="bg-gradient-to-b bg-headerBackGround to-gray-900 px-4 py-8">
      <div className="max-w-8xl mx-auto">
        <hr className="border-t border-gray-300 mb-10" />
        
        <h2 className="text-2xl md:text-3xl font-forumNormal mb-8 text-black ">
        Customer frequently viewed
        </h2>

        <Swiper
          spaceBetween={20}
          breakpoints={{
            430: { slidesPerView: 1.5, slidesPerGroup: 1 },
            375: { slidesPerView: 1.5, slidesPerGroup: 1 },
            360: { slidesPerView: 1.5, slidesPerGroup: 1 },
            768: { slidesPerView: 4.5, slidesPerGroup: 1 },
            344: { slidesPerView: 1.5, slidesPerGroup: 1 },
            667: { slidesPerView: 4.5, slidesPerGroup: 1 },
            1024: { slidesPerView: 4.5, slidesPerGroup: 1 },
          }}
          loop={true}
          className="w-full"
        >
          {products
            .filter((product) => product.category === "Hoodies")
            .map((product) => (
              <SwiperSlide key={product.id}>
                <div className="group relative bg-gray-400 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-900">
                  <div className="absolute top-2 right-2 z-10">
                    <button
                    onClick={() => toggleLike(product)}
                     className="p-2 bg-gray-800/80 backdrop-blur-sm rounded-full shadow-md hover:bg-gray-700 transition-colors duration-300 transform hover:scale-110">
                    <Heart
    className={`w-5 h-5 ${
      isProductInWishlist(product._id) ? 'text-red-500 fill-red-500' : 'text-red-600'
    } transition-colors`}
  />
                    </button>
                  </div>

                  <div className="absolute top-2 left-2 z-10">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-gray-800/80 text-white shadow-sm backdrop-blur-sm">
                      <Tag className="w-3 h-3 mr-1" />
                      New
                    </span>
                  </div>

                  <Link to={`/product-details/${product._id}`} className="block">
                    <div className="relative h-64 md:h-72 w-full overflow-hidden rounded-t-xl bg-gray-600">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    <div className="p-4 bg-gradient-to-b from-gray-700 to-gray-800">
                      <h3 className="font-forumNormal text-sm md:text-lg text-gray-200 mb-2 truncate group-hover:text-white">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm md:text-lg font-medium text-white group-hover:text-gray-200">
                          ₹{product.price}
                        </span>
                        <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-full bg-red-600 text-white group-hover:bg-red-600 transition-colors">
                          {/* <Clock className="w-3 h-3 mr-1 animate-pulse" /> */}
                          For Sale
                        </span>
                      </div>

                      <div className="mt-3 transform opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <div className="h-1 w-full bg-gradient-to-r from-gray-600 to-gray-500 rounded-full" />
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MoreProduct3;