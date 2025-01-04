import { Link, useLocation, useParams } from 'react-router-dom';
import ShopFilters from '../components/ShopFilter';
import { useEffect, useRef, useState } from 'react';
import { X, SlidersHorizontal,Heart, ShoppingCart } from 'lucide-react'; // For hamburger and close icons



const Shop = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); // State for sidebar visibility
  const [products, setProducts] = useState([]); // State for products
  const [loading, setLoading] = useState(true); // State for loading status
  const Shop = useRef(null);

  const [filters, setFilters] = useState({
    priceRange: 12500,
    selectedColors: [],
    selectedSizes: [],
  });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { category } = useParams();

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const response = await fetch(
          'https://abhinasv-s-backend.onrender.com/api/product/getproducts'
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]); // Fallback in case of error
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (Shop.current) {
      window.scrollTo({
        top: Shop.current.offsetTop - 50,
        behavior: 'smooth',
      });
    }
  }, []);

  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top of the page
  }, [location]);
  
  

   // Filter products based on selected filters
    // Apply filters and category-based filtering
  useEffect(() => {
    const applyFilters = () => {
      const { priceRange, selectedColors, selectedSizes } = filters;
       // Change category to 'hoodies' if it's 'all-products'
  


      const filtered = products.filter((product) => {

        const matchesCategory = !category || product.category.toLowerCase() === category.toLowerCase();
        const matchesPrice = product.price <= priceRange;
        const matchesColor = 
          selectedColors.length === 0 || 
          selectedColors.some((color) => product.color?.includes(color));
        const matchesSize = 
          selectedSizes.length === 0 || 
          selectedSizes.some((size) => product.size?.includes(size));

        return matchesCategory && matchesPrice && matchesColor && matchesSize;
      });

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [filters, products, category]);
  

  return (
    <>
      {/* Navigation Bar */}
      <div className="relative">
        <div className="flex items-center justify-between text-xl p-4 font-forumNormal bg-[#E6FF87] text-black">
          <div>
            <Link to="/" className="pl-3">
              Home
            </Link>
            <span className="mx-2">&gt;</span>
            <span>Shop</span>
          </div>

          {/* Hamburger Icon for small screens */}
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="md:hidden block p-2 text-black rounded-lg"
          >
            {drawerOpen ? <X className="w-6 h-6" /> : <SlidersHorizontal className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Shop Layout */}
      <div ref={Shop} className="bg-headerBackGround flex flex-col md:flex-row">
        {/* Sidebar */}
        <div
          className={`fixed z-50 top-0 left-0 w-72 h-full bg-headerBackGround p-6 transition-transform transform ${
            drawerOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:relative md:block`}
        >
          <ShopFilters onFiltersChange={(updatedFilters) => setFilters(updatedFilters)} />
        </div>

        {/* Overlay when sidebar is open */}
        {drawerOpen && (
          <div
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          ></div>
        )}

        {/* Products Section */}
        <div className="bg-headerBackGround w-full px-4 md:px-6 py-8">
      <h1 className="font-forumNormal text-4xl md:text-5xl mb-8 text-left">
        {category ? category.charAt(0).toUpperCase() + category.slice(1) : "All Products"}
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 mb-28">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <Link to={`/product-details/${product._id}`}>
                    <div className="aspect-[5/5] overflow-hidden rounded-t-xl">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-full w-full object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                  
                  <button className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-gray-100 transition-colors duration-300 transform hover:scale-110">
                    <Heart className="w-5 h-5 text-red-500" />
                  </button>
                </div>

                <div className="p-2">
                  <Link to={`/product-details/${product._id}`}>
                    <h3 className="font-forumNormal text-left text-sm md:text-lg text-gray-900 mb-1 truncate group-hover:text-black">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg md:text-xl font-bold font-forumNormal text-gray-900">
                      ₹{product.price}
                    </span>
                    {product.price < 1599 && (
                      <span className="text-sm md:text-base font-forumNormal text-gray-500 line-through">
                        ₹1599
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3.5 py-1 text-xs font-medium rounded-lg bg-red-100 text-red-800">
                      Deal of the Day
                    </span>
                    
                    <Link to={`/product-details/${product._id}`} className="hidden lg:block">
                      <button className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition-colors">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-lg text-gray-500 py-12">
              No products available.
            </p>
          )}
        </div>
      )}
    </div>
          
      </div>
    </>
  );
};

export default Shop;
