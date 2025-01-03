import { Link, useParams } from 'react-router-dom';
import ShopFilters from '../components/ShopFilter';
import { useEffect, useRef, useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react'; // For hamburger and close icons
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Spinner from '../components/Spinner';

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
          'http://localhost:5000/api/product/getproducts'
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
          className={`fixed z-20 top-0 left-0 w-72 h-full bg-headerBackGround p-6 transition-transform transform ${
            drawerOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:relative md:block`}
        >
          <ShopFilters onFiltersChange={(updatedFilters) => setFilters(updatedFilters)} />
        </div>

        {/* Overlay when sidebar is open */}
        {drawerOpen && (
          <div
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black opacity-50 z-0 md:hidden"
          ></div>
        )}

        {/* Products Section */}
        <div className="bg-headerBackGround md:w-4/4 w-full forum-regular mb-3">
        <h1 className="forum-regular text-5xl mb-5 text-left pt-2 pl-3">
            {category ? category.charAt(0).toUpperCase() + category.slice(1) : "All Products"}
          </h1>
          {/* Spinner for loading */}
          {loading ? (
            <div className="flex justify-center items-center h-60">
              <Spinner/>
            </div>
          ) : (
            /* Product Grid */
            <div className="ml-2 mr-2 gap-2 mb-28 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 md:gap-4">
               {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div key={product._id} className="overflow-hidden h-full">
                     <Link to={`/product-details/${product._id}`}>
                    <img
                      src={product.images && product.images[0]}
                      alt={product.name}
                      className="h-60 rounded-lg md:h-96 mb-2 w-full object-cover mx-auto"
                    /></Link>
                    <div>
                      <div className="flex">
                      <Link to={`/product-details/${product._id}`}><h3 className="text-sm font-forumNormal w-full mr-10 text-gray-900 md:text-lg">
                          {product.name}
                        </h3></Link>
                        <FavoriteBorderIcon
                          className="cursor-pointer hover:scale-110 transition-transform ml-45 md:ml-34"
                          sx={{
                            color: 'red',
                            fontSize: { xs: 24, sm: 30 },
                            fontWeight: 'normal',
                          }}
                        />
                      </div>
                      <div className="flex items-center">
                        <p className="text-lg font-bold font-forumNormal md:text-lg mr-3 text-gray-700">
                          ₹{product.price}
                        </p>
                        {product.price < 1599 && (
                          <p className="text-sm font-forumNormal md:text-lg text-gray-700 line-through">
                            ₹1599
                          </p>
                        )}
                      </div>
                      <span className="inline-block px-1 py-1 text-sm text-white bg-red-600 rounded-lg">
                        Deal of the Day
                      </span>
                      <Link to={`/product-details/${product._id}`}>
                        <button className="w-full mt-4 py-3 text-xl rounded-lg bg-homePage text-white hover:bg-gray-900">
                          Add to Cart
                        </button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-2 lg:col-span-3">
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
