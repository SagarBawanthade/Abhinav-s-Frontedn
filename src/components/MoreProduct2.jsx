import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Heart } from 'lucide-react';
import { removeFromWishlist, addToWishlist } from "../feature/wishlistSlice";
import { toast } from 'react-toastify';
import 'swiper/css';
import ProductSkeletonLoader from './ProductSkeletonLoader';

const MoreProducts2 = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const wishlist = useSelector(state => state.wishlist.items);
  const dispatch = useDispatch();

  const isProductInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId);
  };

  const toggleLike = (item) => {
    if (isProductInWishlist(item._id)) {
      dispatch(removeFromWishlist(item._id));
      toast.success("Removed from wishlist");
    } else {
      dispatch(addToWishlist(item));
      toast.success("Added to wishlist");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    
    fetch('https://backend.abhinavsofficial.com/api/product/getproducts')
      .then((response) => response.json())
      .then((data) => {
        const sortedProducts = data.sort((a, b) => b._id.localeCompare(a._id));
        setProducts(sortedProducts);
      })
      .catch((error) => console.error('Error:', error))
      .finally(() => {
        // Add a small delay for smoother transition
        setTimeout(() => {
          setLoading(false);
        }, 800);
      });
  }, []);

  if (loading) {
    return <ProductSkeletonLoader/>
  }

  return (
    <div className="bg-headerBackGround py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-medium text-gray-900 mb-4">
          You Might Also Like
        </h2>
        <hr className="border-t-2 border-gray-200 mb-8" />
        
        <Swiper
          spaceBetween={24}
          breakpoints={{
            320: { slidesPerView: 2.2 },
            640: { slidesPerView: 2.2 },
            768: { slidesPerView: 3.2 },
            1024: { slidesPerView: 4.2 },
          }}
          className="w-full"
        >
          {products
            .filter((product) => product.category === "Oversize-Tshirt")
            .map((product) => (
              <SwiperSlide key={product._id}>
                <div className="group relative">
                  <Link to={`/product-details/${product._id}`}>
                    <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700 font-medium">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          ₹{product.price}
                        </p>
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleLike(product);
                        }}
                        className="rounded-full p-1.5 hover:bg-gray-100 transition-colors"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            isProductInWishlist(product._id)
                              ? 'text-red-500 fill-red-500'
                              : 'text-gray-400'
                          }`}
                        />
                      </button>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MoreProducts2;