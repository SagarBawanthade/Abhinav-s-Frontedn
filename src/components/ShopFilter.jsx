import { useEffect, useState } from "react";
import { Plus, Minus, Check} from "lucide-react";
import { Link,useLocation  } from "react-router-dom";


const ShopFilters = ({ onFiltersChange }) => {




  const [filters, setFilters] = useState({

    priceOpen: false,
    colorOpen: false,
    sizeOpen: false,
  });
  const [priceRange, setPriceRange] = useState(12500);
  const location = useLocation();
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const colorOptions = ["lavender", "Beige","Kiwi-Green", "Royal-Blue", "red", "Yellow", "Navy Blue", "Black", "white","umber", "cyan"];
  const sizeOptions = [ "S", "M", "L", "XL"];

  const toggleFilter = (filterKey) => {
    setFilters((prev) => ({ ...prev, [filterKey]: !prev[filterKey] }));
  };



  const clearFilters = () => {
    setPriceRange(12500);
    setSelectedColors([]);
    setSelectedSizes([]);

    window.history.replaceState({}, '', window.location.pathname);
  };

  const handleFiltersChange = (updatedFilters) => {
    console.log("Updated filters:", updatedFilters);
    setFilters(updatedFilters);
  };
  

  useEffect(() => {
    onFiltersChange({ priceRange, selectedColors, selectedSizes });
  }, [priceRange, selectedColors, selectedSizes]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    
    const colorParam = urlParams.get('color');
    if (colorParam) {
      const colorValues = colorParam.split(',');
      setSelectedColors(colorValues);
    } else {
      setSelectedColors([]);
    }
    
    const sizeParam = urlParams.get('size');
    if (sizeParam) {
      const sizeValues = sizeParam.split(',');
      setSelectedSizes(sizeValues);
    } else {
      setSelectedSizes([]);
    }
    
    // Get price range from URL if available
    const priceParam = urlParams.get('price');
    if (priceParam && !isNaN(Number(priceParam))) {
      setPriceRange(Number(priceParam));
    }
    
  }, [location.search]);


  // const handleToggleSelection = (item, type) => {
  //   if (type === "color") {
  //     setSelectedColors((prev) =>
  //       prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
  //     );
    
  //   } else if (type === "size") {
  //     setSelectedSizes((prev) =>
  //       prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
  //     );
     
  //   }
  // };

  const handleToggleSelection = (item, type) => {
    if (type === "color") {
      setSelectedColors((prev) => {
        const newColors = prev.includes(item) 
          ? prev.filter((c) => c !== item) 
          : [...prev, item];
        
        // Update URL when colors change
        const urlParams = new URLSearchParams(window.location.search);
        if (newColors.length > 0) {
          urlParams.set('color', newColors.join(','));
        } else {
          urlParams.delete('color');
        }
        
        // Update the URL without full navigation
        window.history.replaceState(
          {}, 
          '', 
          `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ''}`
        );
        
        return newColors;
      });
    } else if (type === "size") {
      // Similar logic for size...
      setSelectedSizes((prev) => {
        const newSizes = prev.includes(item) 
          ? prev.filter((s) => s !== item) 
          : [...prev, item];
        
        // Update URL when sizes change
        const urlParams = new URLSearchParams(window.location.search);
        if (newSizes.length > 0) {
          urlParams.set('size', newSizes.join(','));
        } else {
          urlParams.delete('size');
        }
        
        window.history.replaceState(
          {}, 
          '', 
          `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ''}`
        );
        
        return newSizes;
      });
    }
  };

  

  return (
    <div className="font-forumNormal pl-4 bg-headerBackGround overflow-x-auto flex flex-col">
      <h3 className="font-bold text-3xl mb-6 forum-regular">Browse By</h3>
      <div className="border-b border-gray-700 mb-6"></div>
      <ul className="space-y-5">
        <li>
          <Link to="/shop" className="text-left w-full mt-8 mb-8 text-gray-700 hover:underline">
            All Products
          </Link>
        </li>
        {["Solid Color T-Shirt & Oversized","Hoodies", "Oversize-Tshirt", "Tshirt", "Couple-Tshirt", "Holi-Special"].map((category) => (
  <li key={category}>
    <Link
      to={`/shop/${category}`}
      className="text-left w-full mb-4 text-gray-700 hover:underline"
    >
      {category}
     





    </Link>
  </li>
))}
      </ul>

      <div className="mt-10">
        <h3 className="font-bold text-3xl forum-regular mb-4 flex items-center justify-between">
          Filters
          <button onClick={clearFilters} className="flex items-center mt-2 font-bold font-avenir text-sm text-red-500">
           Clear All
          </button>
          
        </h3>
        
        <div className="border-b border-gray-700 mb-6"></div>
        <ul className="space-y-6 overflow-y-auto max-h-[80vh]">
          {/* Price Filter */}
          <li>
            <button
              className="flex justify-between items-center w-full text-gray-700"
              onClick={() => toggleFilter("priceOpen")}
            >
              Price
              {filters.priceOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
            {filters.priceOpen && (
              <div className="mt-4">
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-0.5 appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #000 ${((priceRange - 500) / (5000 - 500)) * 100}%, #D1D5DB 0%)`,
                  }}
                />
                <style jsx>{`
                  input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: black;
                    cursor: pointer;
                  }
                `}</style>
                <div className="flex justify-between mt-2 text-gray-600 text-sm">
                  <span>₹500</span>
                  <span>₹{priceRange}</span>
                </div>
              </div>
            )}
          </li>

          {/* Color Filter */}
          <li>
            <button
              className="flex justify-between items-center w-full text-gray-700"
              onClick={() => toggleFilter("colorOpen")}
            >
              Color
              {filters.colorOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
            {filters.colorOpen && (
              <div className="mt-4 flex flex-col">
                {colorOptions.map((color) => (
                  <div key={color} className="flex items-center mb-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="hidden peer"
                        checked={selectedColors.includes(color)}
                        onChange={() => handleToggleSelection(color, "color")}
                      />
                      <div className="w-5 h-5 border border-gray-300 rounded-md flex items-center justify-center peer-checked:bg-black peer-checked:border-transparent transition-all duration-300 relative">
                        {selectedColors.includes(color) && (
                          <Check className="w-4 h-4 text-white absolute" />
                        )}
                      </div>
                      <span className="text-sm ml-2">{color}</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </li>

          {/* Size Filter */}
          <li>
            <button
              className="flex justify-between items-center w-full text-gray-700"
              onClick={() => toggleFilter("sizeOpen")}
            >
              Size
              {filters.sizeOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
            {filters.sizeOpen && (
              <div className="mt-4 flex flex-col">
                {sizeOptions.map((size) => (
                  <div key={size} className="flex items-center mb-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="hidden peer"
                        checked={selectedSizes.includes(size)}
                        onChange={() => handleToggleSelection(size, "size")}
                      />
                      <div className="w-5 h-5 border border-gray-300 rounded-md flex items-center justify-center peer-checked:bg-black peer-checked:border-transparent transition-all duration-300 relative">
                        {selectedSizes.includes(size) && (
                          <Check className="w-4 h-4 text-white absolute" />
                        )}
                      </div>
                      <span className="text-sm ml-2">{size}</span>
                    </label>
                  </div>
                ))}
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ShopFilters;
