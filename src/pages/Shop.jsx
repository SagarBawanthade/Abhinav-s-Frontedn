import { Link, useLocation, useParams } from 'react-router-dom';
import ShopFilters from '../components/ShopFilter';
import { useEffect, useRef, useState } from 'react';
import { X, SlidersHorizontal, Heart, ShoppingCart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from "../feature/wishlistSlice";
import ProductsHeader from '../components/ProductsHeader';
import { fetchProducts } from '../feature/productSlice';
import PromoBadge from '../components/PromoBadge';
import {  AnimatePresence } from 'framer-motion';
import PromotionalOffer from '../components/PromotionalOffer';

const Shop = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const shopRef = useRef(null);
  const { category } = useParams();
  const { tag } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const { items: products, loading } = useSelector((state) => state.products);
  const wishlist = useSelector(state => state.wishlist.items);
  const prevCategory = useRef(category);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [contentOpacity, setContentOpacity] = useState(0);
   const [offerVisible, setOfferVisible] = useState(true);
  // Pagination state
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(() => {
    // Initialize from sessionStorage if available
    const savedPage = sessionStorage.getItem(`currentPage_${category || 'all'}`);
    return savedPage ? parseInt(savedPage) : 1;
  });
  const productsPerPage = 21;

  // Filter states
  const [filters, setFilters] = useState({
    priceRange: 12500,
    selectedColors: [],
    selectedSizes: [],
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); 

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  // Save current page to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem(`currentPage_${category || 'all'}`, currentPage.toString());
  }, [currentPage, category]);

  // Filter products
  useEffect(() => {
    const applyFilters = () => {
      const { priceRange, selectedColors, selectedSizes } = filters;
  
      const filtered = products.filter((product) => {
        const matchesCategory = !category || product.category.toLowerCase() === category.toLowerCase();
        const matchesTag = !tag || (product.tags && product.tags.includes(tag));

        const matchesPrice = product.price <= priceRange;
        const matchesColor =
          selectedColors.length === 0 ||
          selectedColors.some((color) => product.color?.includes(color));
        const matchesSize =
          selectedSizes.length === 0 ||
          selectedSizes.some((size) => product.size?.includes(size));
  
        return matchesCategory && matchesTag && matchesPrice && matchesColor && matchesSize;
      });
  
      const hoodieProducts = filtered
        .filter(p => p.category.toLowerCase() === 'hoodies')
        .reverse();
      
      const nonHoodieProducts = filtered
        .filter(p => p.category.toLowerCase() !== 'hoodies')
        .reverse();
      
      const sortedProducts = [...nonHoodieProducts, ...hoodieProducts];

      setFilteredProducts(sortedProducts);
      
      // Update visible products based on current page
      const endIndex = currentPage * productsPerPage;
      setVisibleProducts(sortedProducts.slice(0, endIndex));
    };
  
    applyFilters();
  }, [filters, products, category, tag, currentPage]);

  // Reset pagination when category changes
  useEffect(() => {
    if (category !== prevCategory.current) {
      setCurrentPage(1);
      sessionStorage.removeItem(`currentPage_${prevCategory.current || 'all'}`);
    }
  }, [category]);

  // Handle "Show More" click
  const handleShowMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  // Wishlist functions
  const isProductInWishlist = (productId) => {
    return wishlist.some(item => item._id === productId);
  };

  const toggleLike = (item) => {
    if (isProductInWishlist(item._id)) {
      dispatch(removeFromWishlist(item._id));
    } else {
      dispatch(addToWishlist(item));
    }
  };

  // Scroll position handling
  useEffect(() => {
    const handleScrollPosition = async () => {
      const storageKey = category ? `shopScrollPosition_${category}` : 'shopScrollPosition';
      const savedPosition = sessionStorage.getItem(storageKey);

      setIsTransitioning(true);
      setContentOpacity(0);

      await new Promise(resolve => setTimeout(resolve, 300));

      if (savedPosition && shopRef.current) {
        shopRef.current.style.scrollBehavior = 'auto';
        shopRef.current.scrollTop = parseInt(savedPosition);
        await new Promise(resolve => setTimeout(resolve, 50));
        shopRef.current.style.scrollBehavior = 'smooth';
      } else if (!location.state?.fromProduct || category !== prevCategory.current) {
        if (shopRef.current) {
          shopRef.current.style.scrollBehavior = 'auto';
          shopRef.current.scrollTop = 0;
          window.scrollTo(0, 0);
          shopRef.current.style.scrollBehavior = 'smooth';
        }
      }

      await new Promise(resolve => setTimeout(resolve, 100));
      setContentOpacity(1);
      setIsTransitioning(false);
    };

    if (!loading) {
      handleScrollPosition();
    }
    
    prevCategory.current = category;
  }, [location.state, category, loading]);

  const handleProductClick = (productId) => {
    if (shopRef.current) {
      const storageKey = category ? `shopScrollPosition_${category}` : 'shopScrollPosition';
      sessionStorage.setItem(storageKey, shopRef.current.scrollTop.toString());
    }
  };

  const handleCloseOffer = () => {
    setOfferVisible(false);
  };

  // Function to render the product card
// Function to render the product card
const renderProductCard = (product) => (
  <div key={product._id} className="group relative bg-headerBackGround rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
    <Link 
      to={`/product-details/${product._id}`} 
      onClick={() => handleProductClick(product._id)}
      state={{ fromProduct: false, fromShop: true, fromCategory: category ? `/shop/${category}` : '/shop' }}
    >
      <div className="relative">
        <div className="aspect-[5/5] overflow-hidden rounded-t-xl relative">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
          />
 
          {/* Category badge in the corner (optional) */}
          {/* {product.category && (
            <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden">
              <div className="bg-[#0C3937] text-white shadow-lg text-xs absolute font-semibold top-0 left-0 transform -rotate-45 translate-y-4 -translate-x-14 w-40 text-center md:py-1">
                <div className="flex items-center justify-center" style={{ lineHeight: "12px", fontSize: "12px" }}>
                  <span>
                    {product.category === "Hoodies" ? "30%" : 
                      product.category === "Holi-Special" ? "45%" :
                      product.category === "Couple-Tshirt" ? "40%" : "SALE"}
                    <span className="ml-0.5">OFF</span>
                  </span>
                </div>
              </div>
            </div>
          )} */}

          {/* Clean rectangular offer banner at the bottom of the image */}
          {/* {(product.category === "Oversize-Tshirt" || product.category === "Tshirt") && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r bg-[#0C3937] py-1.5 px-2 text-center">
              <div className="flex items-center justify-center">
                <span className="text-white text-xs md:text-sm">
                  {product.category === "Oversize-Tshirt" 
                    ? "BUY 2 FOR ₹999" 
                    : "BUY 3 FOR ₹999  ||  BUY 2 FOR ₹899"}
                </span>
              </div>
            </div>
          )} */}
        </div>

        
       
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleLike(product);
          }}
          className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 transform hover:scale-110"
        >
          <Heart
            className={`w-5 h-5 ${
              isProductInWishlist(product._id) ? 'text-red-500 fill-red-500' : 'text-gray-600'
            } transition-colors`}
          />
        </button>
      </div>
      
      <div className="p-2">
        <h3 className="font-forumNormal text-left text-sm md:text-lg text-gray-900 mb-1 truncate group-hover:text-black">
          {product.name}
        </h3>

        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg md:text-xl font-bold font-forumNormal text-gray-900">
            ₹{product.price}
          </span>
          <span className="text-sm md:text-lg font-bold font-forumNormal text-gray-700 line-through">
            ₹
            {product.price +
              (product.category === "Oversize-Tshirt"
                ? 1400
                : product.category === "Tshirt"
                ? 500
                : product.category === "Hoodies"
                ? 1500
                : product.category === "Couple-Tshirt"
                ? 1200
                : product.category === "Holi-Special"
                ? 1100
                : 600 )}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <PromoBadge product={product} />
          <div className="hidden lg:block">
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

  return (
    <>
{/* <AnimatePresence>
        {offerVisible && <PromotionalOffer onClose={handleCloseOffer} />}
      </AnimatePresence> */}
    
        


      {/* Navigation Bar */}
      <div className="relative">
        <div className="flex items-center justify-between text-xl p-4 font-forumNormal bg-[#0C3937] text-white">
          <div>
            <Link to="/" className="pl-3">Home</Link>
            <span className="mx-2">&gt;</span>
            <span>Shop</span>
          </div>
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="md:hidden block p-2 text-white rounded-lg"
          >
            {drawerOpen ? <X className="w-6 h-6" /> : <SlidersHorizontal className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Loading Spinner */}
      {(loading || isTransitioning) && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50 transition-all duration-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
            <p className="text-gray-600 font-forumNormal">Loading...</p>
          </div>
        </div>
      )}

      {/* Shop Layout */}
      <div 
        ref={shopRef}
        className="bg-headerBackGround flex flex-col md:flex-row"
        style={{ 
          height: 'calc(100vh - 60px)', 
          overflowY: 'auto',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {/* Sidebar */}
        <div
          className={`fixed z-50 md:z-30 top-0 left-0 w-72 h-full bg-headerBackGround p-6 transition-transform duration-200 transform ${
            drawerOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:relative md:block`}
        >
          <ShopFilters onFiltersChange={(updatedFilters) => setFilters(updatedFilters)} />
        </div>

        {/* Overlay */}
        {drawerOpen && (
          <div
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px] z-40 md:hidden"
          ></div>
        )}

        {/* Products Section */}
        <div className="bg-headerBackGround w-full px-4 md:px-6 py-8">
          {/* Show special banner only for Holi-Special category */}
          {category === 'Holi-Special' && (
            <div className="mb-6 p-4 bg-purple-100 text-purple-800 rounded-lg border border-purple-300">
              <p className="font-forumNormal text-center">
                Showing our latest Holi-Special collection! Get your colorful festival wear now.
              </p>
            </div>
          )}

          {/* Products Header */}
          <ProductsHeader 
            category={category} 
            tag={tag} 
            filteredProducts={filteredProducts} 
          />

          {/* Products Grid */}
          <div 
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 mb-8"
            style={{
              transition: 'opacity 300ms ease-in-out, transform 300ms ease-in-out',
              opacity: contentOpacity,
              transform: `translateY(${contentOpacity === 0 ? '10px' : '0'})`,
            }}
          > 
            {visibleProducts.length > 0 ? (
              visibleProducts.map(product => renderProductCard(product))
            ) : (
              <p className="col-span-full text-center text-lg text-gray-500 py-12">
                {loading ? 'Loading Products...' : 'No products found!'}      
              </p>
            )}
          </div>

          {/* Show More Button */}
          {filteredProducts.length > visibleProducts.length && (
            <div className="flex justify-center">
              <button
                onClick={handleShowMore}
                className="group flex items-center mb-14 gap-3 px-8 py-2 bg-[#0C3937] text-white rounded-md hover:bg-[#0a2e2c] transition-all duration-300 font-medium shadow-md hover:shadow-lg"
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className='font-forumNormal'>Show More Products</span>
                <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full ml-2">
                  <span className="text-sm">
                    +{filteredProducts.length - visibleProducts.length}
                  </span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Shop;