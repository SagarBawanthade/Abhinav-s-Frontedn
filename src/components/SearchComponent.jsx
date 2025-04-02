import React, { useState, useRef, useEffect } from 'react';
import { Search, XMarkIcon } from 'lucide-react';

const SearchComponent = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const searchInputRef = useRef(null);

  // Sample data structure for recommendations
  const suggestionData = {
    // Categories
    't': [
      { type: 'category', text: 'T-Shirts', link: '/shop/category/t-shirts' },
      { type: 'tag', text: 'Trendy', link: '/shop/tag/trendy' },
    ],
    'o': [
      { type: 'tag', text: 'Oversized', link: '/shop/tag/oversized' },
      { type: 'tag', text: 'Original', link: '/shop/tag/original' },
    ],
    'd': [
      { type: 'tag', text: 'DC', link: '/shop/tag/dc' },
      { type: 'category', text: 'Denim', link: '/shop/category/denim' },
    ],
    'h': [
      { type: 'category', text: 'Hoodies', link: '/shop/category/hoodies' },
    ],
    's': [
      { type: 'category', text: 'Shorts', link: '/shop/category/shorts' },
      { type: 'tag', text: 'Summer', link: '/shop/tag/summer' },
    ],
  };

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Update recommendations as user types
  useEffect(() => {
    if (searchQuery.length === 0) {
      setRecommendations([]);
      return;
    }
    
    const firstChar = searchQuery.toLowerCase().charAt(0);
    const matchingItems = suggestionData[firstChar] || [];
    
    // Filter further if they've typed more than one character
    if (searchQuery.length > 1) {
      const filtered = matchingItems.filter(item => 
        item.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setRecommendations(filtered);
    } else {
      setRecommendations(matchingItems);
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery) {
      // Implement default search action when pressing Enter
      console.log(`Searching for: ${searchQuery}`);
      // Redirect to search results page
      // window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleRecommendationClick = (link) => {
    // Navigate to the recommended link
    console.log(`Navigating to: ${link}`);
    // window.location.href = link;
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <div
      className={`fixed inset-0 bg-white bg-opacity-95 z-50 flex items-start justify-center transition-all duration-300 ease-in-out ${
        searchOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{
        paddingTop: "100px",
        backdropFilter: "blur(5px)",
      }}
    >
      <div
        className="w-full max-w-4xl px-6 transition-transform duration-300 transform"
        style={{
          transform: searchOpen ? "translateY(0)" : "translateY(-20px)",
        }}
      >
        <div className="relative">
          <div className="flex items-center border-b-2 border-gray-300 pb-4">
            <Search size={24} className="text-gray-500 mr-4" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for Hoodies, T-shirts and oversized..."
              className="w-full text-xl md:text-2xl outline-none bg-transparent font-forumNormal"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
            <div 
              className="cursor-pointer text-gray-500 hover:text-gray-800"
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery('');
              }}
            >
              <XMarkIcon size={24} />
            </div>
          </div>
          
          {/* Recommendations section */}
          {recommendations.length > 0 && (
            <div className="mt-4 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-2">
                <p className="text-sm text-gray-500 mb-2 px-3">Recommendations</p>
                <ul>
                  {recommendations.map((item, index) => (
                    <li 
                      key={index}
                      className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => handleRecommendationClick(item.link)}
                    >
                      <div className="mr-2">
                        {item.type === 'category' ? (
                          <div className="text-blue-500 bg-blue-100 rounded-full px-2 py-1 text-xs">
                            Category
                          </div>
                        ) : (
                          <div className="text-green-500 bg-green-100 rounded-full px-2 py-1 text-xs">
                            Tag
                          </div>
                        )}
                      </div>
                      <span className="text-gray-800">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;