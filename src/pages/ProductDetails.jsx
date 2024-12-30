import { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaTruck, FaTimesCircle, FaExchangeAlt } from "react-icons/fa";

function ProductDetails() {
  const [mainImage, setMainImage] = useState(
    "https://rukminim2.flixcart.com/image/832/832/xif0q/sweatshirt/a/a/r/xl-lavender-abhinavs-best-of-world-original-imah75prsgfbrsxf.jpeg?q=70&crop=false"
  );
  const [openSection, setOpenSection] = useState(null);
  
  const productDetailsRef = useRef(null);

  // Adjusting scroll behavior with offset to account for potential fixed header or margin
  useEffect(() => {
    if (productDetailsRef.current) {
      window.scrollTo({
        top: productDetailsRef.current.offsetTop - 50,  // Adjust the offset (50px for header)
        behavior: "smooth", // Smooth scroll
      });
    }
  }, []);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleThumbnailClick = (src) => {
    setMainImage(src);
  };

  return (
    <div ref={productDetailsRef} className="bg-headerBackGround">
      <div className="container bg-headerBackGround mx-auto px-4 py-8">
        <div className="font-forumNormal bg-headerBackGround flex flex-wrap -mx-4">
          {/* Product Images */}
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src={mainImage}
              alt="Product"
              className="w-full h-auto rounded-lg shadow-md mb-4"
            />
            <div className="flex gap-4 py-4 justify-center overflow-x-auto">
              <img
                src="https://rukminim2.flixcart.com/image/832/832/xif0q/sweatshirt/a/a/r/xl-lavender-abhinavs-best-of-world-original-imah75prsgfbrsxf.jpeg?q=70&crop=false"
                alt="Thumbnail 1"
                className="w-16 h-16 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                onClick={() =>
                  handleThumbnailClick(
                    "https://rukminim2.flixcart.com/image/832/832/xif0q/sweatshirt/a/a/r/xl-lavender-abhinavs-best-of-world-original-imah75prsgfbrsxf.jpeg?q=70&crop=false"
                  )
                }
              />
              <img
                src="https://rukminim2.flixcart.com/image/832/832/xif0q/sweatshirt/s/v/u/xl-lavender-abhinavs-best-of-world-original-imah75prmhpzgdf5.jpeg?q=70&crop=false"
                alt="Thumbnail 2"
                className="w-16 h-16 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                onClick={() =>
                  handleThumbnailClick(
                    "https://rukminim2.flixcart.com/image/832/832/xif0q/sweatshirt/s/v/u/xl-lavender-abhinavs-best-of-world-original-imah75prmhpzgdf5.jpeg?q=70&crop=false"
                  )
                }
              />
              <img
                src="https://rukminim2.flixcart.com/image/832/832/xif0q/sweatshirt/e/s/k/xl-lavender-abhinavs-best-of-world-original-imah75prgw3mtgfy.jpeg?q=70&crop=false"
                alt="Thumbnail 3"
                className="w-16 h-16 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                onClick={() =>
                  handleThumbnailClick(
                    "https://rukminim2.flixcart.com/image/832/832/xif0q/sweatshirt/e/s/k/xl-lavender-abhinavs-best-of-world-original-imah75prgw3mtgfy.jpeg?q=70&crop=false"
                  )
                }
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 px-4">
            <h2 className="text-3xl font-bold mb-2">
              Unisex True Potential Beige Hoodie
            </h2>
            <div className="mb-4 flex items-center gap-4">
              <span className="text-2xl font-semibold ">₹1299</span>
              <span className="text-gray-500 line-through">₹1599</span>
            </div>
            <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded mb-4">
              In Stock
            </span>
            <p className="text-gray-700 mb-6">
              Experience premium quality and comfort with this unisex hoodie.
              Perfect for casual wear and outdoor activities.
            </p>

            {/* Color Dropdown */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Color:</h3>
              <select
                className="block w-40 p-3 border bg-headerBackGround  text-lg focus:outline-none"
                defaultValue=""
              >
                <option value="" disabled>
                  Select color
                </option>
                <option value="black">Black</option>
                <option value="gray">Gray</option>
                <option value="blue">Blue</option>
              </select>
            </div>

            {/* Size Section with Radio Buttons */}
            <div className="mt-6 mb-6">
              <h3 className="text-lg font-semibold mb-2">Size:</h3>
              <div className="flex gap-4">
                {["S", "M", "L", "XL"].map((size) => (
                  <label key={size} className="flex items-center">
                    <input type="radio" name="size" value={size} className="hidden" />
                    <span className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-400 bg-white text-gray-800 cursor-pointer hover:bg-gray-200 transition duration-300">
                      {size}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Delivery and Return Info */}
            <div className="mt-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <FaTruck className="text-green-600" size={20} />
                <span className="text-gray-700">Free Delivery Available </span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <FaTimesCircle className="text-red-600" size={20} />
                <span className="text-gray-700">No Cash on Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <FaExchangeAlt className="text-blue-600" size={20} />
                <span className="text-gray-700">2-Day Size Exchange Only</span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Link to="/cart">
              <button className="block w-full py-3 text-lg font-semibold bg-[#E6FF87] text-black hover:bg-[#bac68f] transition duration-300">
                Add to Cart
              </button>
            </Link>

            {/* Product Details Dropdown */}
            <div className="mt-4 ">
              <button
                onClick={() => toggleSection("productDetails")}
                className="flex items-center justify-between w-40 text-lg mb-2  py-3 text-gray-800 bg-headerBackGround font-semibold focus:outline-none"
              >
                <span>Product Details</span>
                {openSection === "productDetails" ? (
                  <FaChevronUp className="ml-2 transition-transform duration-300" />
                ) : (
                  <FaChevronDown className=" ml-2 transition-transform duration-300" />
                )}
              </button>
              {openSection === "productDetails" && (
                <div className="px-4 py-3 bg-headerBackGround text-gray-700 font-forumNormal">
                  Experience the perfect blend of comfort and style with our unisex hoodie...
                </div>
              )}
            </div>

            {/* Return and Exchange Policy Dropdown */}
            <div className="mb-6">
              <button
                onClick={() => toggleSection("returnPolicy")}
                className="flex items-center justify-between w-64 text-lg mb-2 py-3 text-gray-800 bg-headerBackGround font-semibold focus:outline-none"
              >
                <span>Return & Exchange Policy</span>
                {openSection === "returnPolicy" ? (
                  <FaChevronUp className="ml-2 transition-transform duration-300" />
                ) : (
                  <FaChevronDown className="ml-2 transition-transform duration-300" />
                )}
              </button>
              {openSection === "returnPolicy" && (
                <div className="px-4 py-3 bg-headerBackGround text-gray-700 font-forumNormal">
                  Items can be returned or exchanged within 7 days of delivery...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
