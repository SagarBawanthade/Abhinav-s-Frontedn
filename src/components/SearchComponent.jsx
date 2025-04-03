import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronRight, TrendingUp } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SearchComponent = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchRecommendations, setSearchRecommendations] = useState([]);
  const searchInputRef = useRef(null);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isOnShopPage = location.pathname.includes('/shop');

  // Product types
  const productTypes = [
    { name: "hoodies", path: "/shop/hoodies", type: "category" },
    { name: "tshirts", path: "/shop/Tshirt", type: "category" },
    { name: "oversized", path: "/shop/Oversize-Tshirt", type: "category" },
    { name: "Couple tshirts", path: "/shop/Couple-Tshirt", type: "category" },
    { name: "holi collection", path: "/shop/Holi-Special", type: "category" }
  ];

  // Tags
  const tags = [
    { name: "Doraemon", path: "/shop/tag/doraemon", type: "tag" },
    { name: "Pikachu", path: "/shop/tag/pikachu", type: "tag" },
    { name: "Marvel", path: "/shop/tag/marvel", type: "tag" },
    { name: "DC", path: "/shop/tag/dc", type: "tag" },
    { name: "Adventure", path: "/shop/tag/adventure", type: "tag" },
    { name: "Trending Talks", path: "/shop/tag/trending-talks", type: "tag" },
    { name: "Spider-Man", path: "/shop/tag/spider-man", type: "tag" },
    { name: "Minions", path: "/shop/tag/minions", type: "tag" },
    { name: "Typography", path: "/shop/tag/typography", type: "tag" },
    { name: "Bear", path: "/shop/tag/bear", type: "tag" },
    { name: "Stay Wild", path: "/shop/tag/stay-wild", type: "tag" },
    { name: "Pooh", path: "/shop/tag/pooh", type: "tag" },
    { name: "Shinchan", path: "/shop/tag/shinchan", type: "tag" },
    { name: "Mickey Mouse", path: "/shop/tag/mickey-mouse", type: "tag" },
    { name: "Panda", path: "/shop/tag/panda", type: "tag" },
    { name: "Explore", path: "/tag/explore", type: "tag" },
    { name: "Duck", path: "/shop/tag/duck", type: "tag" },
    { name: "Goku", path: "/shop/tag/goku", type: "tag" },
    { name: "I am Groot", path: "/shop/tag/i-am-groot", type: "tag" },
    { name: "Ride", path: "/shop/tag/ride", type: "tag" },
    { name: "Ghost", path: "/shop/tag/ghost", type: "tag" },
    { name: "Snoopy", path: "/shop/tag/snoopy", type: "tag" }
  ];
  const colors = [
    { name: "Kiwi Green", path: "/shop?color=Kiwi%20Green", type: "color" },
    { name: "Royal Blue", path: "/shop?color=Royal%20Blue", type: "color" },
    { name: "Red", path: "/shop?color=red", type: "color" },
    { name: "Yellow", path: "/shop?color=Yellow", type: "color" },
    { name: "Navy Blue", path: "/shop?color=Navy%20Blue", type: "color" },
    { name: "Black", path: "/shop?color=Black", type: "color" },
    { name: "White", path: "/shop?color=white", type: "color" },
    { name: "Umber", path: "/shop?color=Umber", type: "color" },
    { name: "Cyan", path: "/shop?color=Cyan", type: "color" },
    { name: "Lavender", path: "/shop?color=lavender", type: "color" },
    { name: "Beige", path: "/shop?color=Beige", type: "color" }
  ];

  // Sample featured items
  const featuredItems = [
    { name: "Marvel", brand: "Collection", path: "/shop/tag/marvel", image: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/f495772e-665f-4515-954a-0a893df7a1a8_WhatsApp%20Image%202025-02-12%20at%203.53.09%20PM%20%287%29.jpeg" },
    { name: "Plain T-shirts", brand: "Plain Tshirts", path: "/shop/plain-tshirt", image: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/ea08474e-fe47-471c-a3f9-040aea4cf53d_K3.jpeg" },
    { name: "Polo T-Shirts", brand: "Polo Collection", path: "/shop/plain-tshirt", image: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/WhatsApp+Image+2025-04-03+at+13.16.46_3411ff1e.jpg" },
    { name: "Couple T-Shirts", brand: "Valentine's", path: "/shop/Couple-Tshirt", image: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/1cf70a61-eb1c-48df-aa6e-06ce26403002_WhatsApp%20Image%202025-02-28%20at%202.41.51%20PM%20%281%29.jpeg" },
    { name: "Typography", brand: "Typography", path: "/shop/tag/typography", image: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/c956fb07-028d-4bf4-9b23-04c9857b2931_WhatsApp%20Image%202025-04-01%20at%208.19.23%20PM%20%281%29.jpeg" },
    { name: "Holi Special", brand: "Festive", path: "/shop/Holi-Special", image: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/3a290076-1db2-428c-b055-d73846be213c_WhatsApp%20Image%202025-03-10%20at%2012.57.31%20PM%20%2821%29.jpeg" }
  ];

  // Sample categories
  const categories = [
    { name: "T-shirts", path: "/shop/Tshirt", icon: <TrendingUp size={16} /> },
    { name: "Oversized-Tshirts", path: "/shop/Oversize-Tshirt", icon: <TrendingUp size={16} /> },
    { name: "Marvek Collection", path: "/shop/tag/marvel", icon: <TrendingUp size={16} /> },
    { name: "Couple-Tshirts", path: "/shop/Couple-Tshirt", icon: <TrendingUp size={16} /> },
    { name: "Hoodies", path: "/shop/hoodies", icon: <TrendingUp size={16} /> },
    { name: "Doraemon Collection", path: "/shop/tag/doraemon", icon: <TrendingUp size={16} /> }
  ];
// Handle search input change with recommendations
const handleSearchInputChange = (query) => {
  setSearchQuery(query);
  
  if (!query.trim()) {
    setSearchRecommendations([]);
    return;
  }

  const lowerCaseQuery = query.toLowerCase();
  
  // Search across product types, tags, and colors
  const matchingProductTypes = productTypes.filter(item => 
    item.name.toLowerCase().includes(lowerCaseQuery)
  );
  
  const matchingTags = tags.filter(item => 
    item.name.toLowerCase().includes(lowerCaseQuery)
  );
  
  const matchingColors = colors.filter(item => 
    item.name.toLowerCase().includes(lowerCaseQuery)
  );
  
  // Check if we have any matches at all
  if (matchingProductTypes.length === 0 && matchingTags.length === 0 && matchingColors.length === 0) {
    // Set a special "no results" value
    setSearchRecommendations([{ 
      name: `No results found for "${query}"`, 
      path: "#", 
      type: "no-results" 
    }]);
    return;
  }
  
  // Combine and limit results (prioritizing exact matches)
  const exactMatches = [...matchingProductTypes, ...matchingTags, ...matchingColors]
    .filter(item => item.name.toLowerCase() === lowerCaseQuery);
    
  const partialMatches = [...matchingProductTypes, ...matchingTags, ...matchingColors]
    .filter(item => item.name.toLowerCase() !== lowerCaseQuery);
  
  // Sort and limit results
  const combinedResults = [...exactMatches, ...partialMatches].slice(0, 8);
  setSearchRecommendations(combinedResults);
};
  // Handle search submission
  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      
      // Check if the search query matches any color (full or partial match)
      const matchingColor = colors.find(
        color => color.name.toLowerCase() === lowerCaseQuery || 
                 color.name.toLowerCase().includes(lowerCaseQuery)
      );
      
      if (matchingColor) {
        // If it's a color, navigate to the shop with color filter
        // If already on shop page, force reload to ensure full component update
        if (isOnShopPage) {
          window.location.href = `/shop?color=${encodeURIComponent(matchingColor.name)}`;
        } else {
          navigate(`/shop?color=${encodeURIComponent(matchingColor.name)}`);
        }
      } else {
        // Regular search
        if (isOnShopPage) {
          window.location.href = `/shop/?q=${encodeURIComponent(searchQuery)}`;
        } else {
          navigate(`/shop/?q=${encodeURIComponent(searchQuery)}`);
        }
      }
      
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen]);

  // Focus on input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [searchOpen]);

  // Toggle search drawer
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setSearchQuery('');
      setSearchRecommendations([]);
    }
  };

  // Clear search input
  const clearSearch = () => {
    setSearchQuery('');
    setSearchRecommendations([]);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <>
      {/* Search Button */}
      <button 
        onClick={toggleSearch}
        className="relative group flex flex-col items-center focus:outline-none"
        aria-label="Search"
      >
        <div className="relative">
          <Search 
            size={24} 
            className="text-gray-700 group-hover:text-gray-900 transition-all duration-300 transform group-hover:scale-110"
          />
         
        </div>
        <span className="hidden sm:block text-xs font-medium mt-1 text-gray-600 group-hover:text-gray-900 transition-colors duration-300">Search</span>
      </button>
      
      {/* Search Modal */}
{/* Search Modal */}
<div
  className={`fixed top-0 left-0 w-screen h-screen z-50 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 ${
    searchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
  }`}
>


        <div 
          ref={searchContainerRef}
          className={`relative w-full h-full md:h-auto md:max-h-[90vh] md:w-[90%] max-w-4xl mx-auto mt-0 md:mt-16 bg-white md:rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 transform ${
            searchOpen ? "translate-y-0" : "-translate-y-10"
          }`}
        >
          {/* Search Header */}
          <div className="sticky top-0 bg-white z-10 px-4 md:px-6 pt-4 md:pt-6 pb-3 border-b border-gray-100 flex items-center shadow-sm">
            <button 
              onClick={() => setSearchOpen(false)} 
              className="md:hidden mr-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Back"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2 transition-all duration-300 focus-within:bg-gray-50 focus-within:shadow-md">
              <Search size={20} className="text-gray-400 flex-shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for products, categories, tags..."
                className="w-full ml-3 text-base md:text-lg outline-none bg-transparent"
                value={searchQuery}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                onKeyDown={handleSearch}
              />
              {searchQuery && (
                <button 
                  onClick={clearSearch}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-700 transition-colors"
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
            
            <button 
              onClick={() => setSearchOpen(false)} 
              className="hidden md:block ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          
          {/* Search Content */}
          <div className="h-[calc(100%-60px)] md:h-auto overflow-y-auto p-4 md:p-6 pb-20 md:pb-12">
            {/* Search Recommendations */}
         {searchRecommendations.length > 0 && (
  <div className="mb-8">
    <div className="flex items-center justify-between mb-3">
      <p className="text-sm font-medium text-gray-500">Search Results</p>
      {searchRecommendations.length > 1 && searchRecommendations[0].type !== 'no-results' && (
        <p className="text-xs text-gray-400">{searchRecommendations.length} items found</p>
      )}
    </div>
    
    {searchRecommendations[0].type === 'no-results' ? (
      // No results found UI
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Search size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-2">No results found</h3>
        <p className="text-gray-500 mb-5 max-w-md mx-auto">
          We couldn't find any matches for "{searchQuery}". Try checking for typos or using different keywords.
        </p>
        <div className="text-sm text-gray-600 bg-white p-3 rounded-lg border border-gray-200 inline-block">
          <p className="font-medium mb-1">Popular searches:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["T-Shirts", "Hoodies", "Marvel", "Oversize"].map(term => (
              <button 
                key={term}
                onClick={() => handleSearchInputChange(term)}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </div>
    ) : (
      // Regular search results
      <ul className="divide-y divide-gray-100 rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
        {searchRecommendations.map((item, index) => (
          <li key={index} className="group">
            <Link
              to={item.path}
              onClick={() => setSearchOpen(false)}
              className="flex items-center px-4 py-3.5 hover:bg-gray-50 transition-colors duration-150"
            >
              {/* Item type badge */}
              <div className="mr-3 flex-shrink-0">
                {item.type === 'category' ? (
                  <div className="text-blue-600 bg-blue-50 rounded-full px-2.5 py-1 text-xs font-medium">
                    Category
                  </div>
                ) : item.type === 'tag' ? (
                  <div className="text-green-600 bg-green-50 rounded-full px-2.5 py-1 text-xs font-medium">
                    Tag
                  </div>
                ) : (
                  <div className="text-purple-600 bg-purple-50 rounded-full px-2.5 py-1 text-xs font-medium">
                    Color
                  </div>
                )}
              </div>
              
              {/* Item name */}
              <div className="flex-1">
                <span className="text-gray-800 font-medium block">{item.name}</span>
                {item.type === 'category' && (
                  <span className="text-xs text-gray-500">Browse {item.name} products</span>
                )}
                {item.type === 'tag' && (
                  <span className="text-xs text-gray-500"></span>
                )}
                {item.type === 'color' && (
                  <span className="text-xs text-gray-500">{item.name} colored items</span>
                )}
              </div>
              
              {/* Color preview for color type
              {item.type === 'color' && (
                <div 
                  className="w-6 h-6 rounded-full border border-gray-200 mr-3"
                  style={{
                    backgroundColor: item.name.toLowerCase() === 'white' ? '#ffffff' : 
                                    item.name.toLowerCase() === 'black' ? '#000000' :
                                    item.name.toLowerCase() === 'red' ? '#ef4444' :
                                    item.name.toLowerCase() === 'yellow' ? '#eab308' :
                                    item.name.toLowerCase() === 'navy blue' ? '#1e3a8a' :
                                    item.name.toLowerCase() === 'royal blue' ? '#1d4ed8' :
                                    item.name.toLowerCase() === 'kiwi green' ? '#84cc16' :
                                    item.name.toLowerCase() === 'umber' ? '#7c2d12' :
                                    item.name.toLowerCase() === 'cyan' ? '#06b6d4' :
                                    item.name.toLowerCase() === 'lavender' ? '#c084fc' :
                                    item.name.toLowerCase() === 'beige' ? '#d4c4a8' : '#cccccc'
                  }}
                ></div>
              )} */}
              
              {/* Arrow icon */}
              <ChevronRight size={18} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </li>
        ))}
      </ul>
    )}
  </div>
)}
            {/* Show featured items if no search query */}
            {!searchQuery && (
              <>
                {/* Featured Items */}
                <div className="mb-8">
                  <h3 className="text-xl font-medium text-gray-800 mb-4 flex items-center">
                    <TrendingUp size={18} className="mr-2 text-gray-500" />
                    <span>Popular Products</span>
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                    {featuredItems.map((item, index) => (
                      <Link 
                      
                        onClick={() => setSearchOpen(false)} 
                        to={item.path} 
                        key={index} 
                        className="group flex flex-col items-center"
                      >
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-3 border-2 border-transparent group-hover:border-gray-200 transition-all duration-300 shadow-sm group-hover:shadow-md">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-800 group-hover:text-gray-900 transition-colors">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.brand}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="text-xl font-medium text-gray-800 mb-4">Popular Categories</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categories.map((category, index) => (
                      <Link 
                        key={index}
                        to={category.path} 
                        className="group flex items-center p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 border border-gray-100 hover:border-gray-200" 
                        onClick={() => setSearchOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3 shadow-sm group-hover:shadow transition-shadow">
                          {category.icon}
                        </div>
                        <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors flex-1">
                          {category.name}
                        </span>
                        <ChevronRight size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;