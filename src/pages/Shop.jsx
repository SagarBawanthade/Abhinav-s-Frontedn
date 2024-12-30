import { Link } from 'react-router-dom';
import ShopFilters from '../components/ShopFilter';
import { useEffect, useRef, useState } from 'react';
import { X ,EllipsisVertical} from 'lucide-react'; // For hamburger and close icons

const Shop = () => {
  const [drawerOpen, setDrawerOpen] = useState(false); // State for sidebar visibility

  const products = [
    {
      id: 1,
      name: 'Unisex Snowman Hoodie',
      href: '#',
      price: '₹999.00',
      imageSrc: '/images/shoplogo.jpg',
      imageAlt: 'Unisex Snowman Hoodie',
    },
    {
      id: 2,
      name: 'Unisex Lavender Hoodie',
      href: '#',
      price: '₹1299.00',
      imageSrc: '/images/AWESOME 1.jpg',
      imageAlt: 'Unisex Lavender Hoodie',
    },
    {
      id: 3,
      name: 'Unisex Sanat Hoodie',
      href: '#',
      price: '₹999.00',
      imageSrc: '/images/AWESOME 1.jpg',
      imageAlt: 'Unisex Lavender Hoodie',
    },
  ];

  const Shop = useRef(null);

  // Smooth scroll to shop section
  useEffect(() => {
    if (Shop.current) {
      window.scrollTo({
        top: Shop.current.offsetTop - 50,
        behavior: 'smooth',
      });
    }
  }, []);

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
            className="md:hidden block p-2 text-black  rounded-lg"
          >
            {drawerOpen ? <X className="w-6 h-6" /> : <EllipsisVertical className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Shop Layout */}
      <div ref={Shop} className="bg-headerBackGround flex flex-col md:flex-row">
        {/* Sidebar */}
        <div
          className={`fixed  z-20 top-0 left-0 w-72 h-full bg-headerBackGround p-6 transition-transform transform ${
            drawerOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:relative md:block`}
        >
          <ShopFilters />
        </div>

        {/* Overlay when sidebar is open */}
        {drawerOpen && (
          <div
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-black opacity-50 z-0 md:hidden"
          ></div>
        )}

        {/* Products Section */}
        <div className="bg-headerBackGround md:w-4/4 w-full forum-regular p-6">
          <h1 className="forum-regular text-5xl mb-5 text-left pt-1">All Products</h1>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="overflow-hidden">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="mx-auto w-96 h-96 object-cover px-4 mb-4"
                />
                <div className="">
                  <h3 className="text-2xl font-semibold text-gray-900">{product.name}</h3>
                  <p className="text-xl text-gray-700">{product.price}</p>
                  <Link to="/product-details">
                    <button className="w-full mt-4 py-3 text-xl bg-homePage text-white hover:bg-gray-900">
                      Add to Cart
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
