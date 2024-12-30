import { useState } from "react";
import { Plus, Minus, Check } from "lucide-react";

const ShopFilters = () => {
  const [filters, setFilters] = useState({
    priceOpen: false,
    colorOpen: false,
    sizeOpen: false,
  });
  const [priceRange, setPriceRange] = useState(12500);

  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const colorOptions = ["Red", "Blue", "Green", "Yellow", "Black"];
  const sizeOptions = ["XS", "S", "M", "L", "XL"];

  const toggleFilter = (filterKey) => {
    setFilters((prev) => ({ ...prev, [filterKey]: !prev[filterKey] }));
  };

  const handleToggleSelection = (item, type) => {
    if (type === "color") {
      setSelectedColors((prev) =>
        prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
      );
    } else if (type === "size") {
      setSelectedSizes((prev) =>
        prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
      );
    }
  };

  return (
    <div className="font-forumNormal pl-4 bg-headerBackGround  flex flex-col">
      {/* Sidebar Content */}
      <h3 className="font-bold text-3xl mb-6 forum-regular">Browse By</h3>
      <div className="border-b border-gray-700 mb-6"></div>
      <ul className="space-y-3">
        {["All Products", "Sweatshirts", "Hoodies", "T-Shirts"].map((category) => (
          <li key={category}>
            <button className="text-left w-full mb-4 text-gray-700 hover:underline">
              {category}
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <h3 className="font-bold text-3xl forum-regular mb-4">Filters</h3>
        <div className="border-b border-gray-700 mb-6"></div>
        <ul className="space-y-6 overflow-y-auto max-h-[80vh]">
          {/* Price Filter */}
          <li>
            <button
              className="flex justify-between items-center w-full text-gray-700"
              onClick={() => toggleFilter("priceOpen")}
            >
              Price
              {filters.priceOpen ? (
                <Minus className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
            </button>
            {filters.priceOpen && (
              <div className="mt-4">
                <input
                  type="range"
                  min="500"
                  max="12500"
                  step="200"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full h-0.5 appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #000 ${((priceRange - 500) / (12500 - 500)) * 100}%, #D1D5DB 0%)`,
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
                  input[type="range"]::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: black;
                    cursor: pointer;
                  }
                  input[type="range"]::-ms-thumb {
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
              {filters.colorOpen ? (
                <Minus className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
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
              {filters.sizeOpen ? (
                <Minus className="w-5 h-5" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
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


