// components/ProductDetails.jsx
import React, { useState, useEffect } from "react";
import { ArrowLeft, Star, Shield, Zap, Clock, Sparkles } from "lucide-react";
import { sizes, availableColors } from "../data/tshirtData";
import DesignUpload from "./DesignUpload";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

// Placeholder fallback if image not found
const FALLBACK_IMAGE = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV0HgoWdDjxMOP6AfhHKtKXMAJxmxeq6iBbA&s";

const ProductDetails = ({
  product,
  selectedSize,
  onSizeChange,
  selectedColor,
  onColorChange,
  uploadedImage,
  onImageUpload,
  onCustomizeSubmit,
  isUploading,
  onBack,
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const userId = useSelector((state) => state.auth.id);
   const [loading, setLoading] = useState(true);
    const [updatedUserData, setUpdatedUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });


  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://backend.abhinavsofficial.com/api/auth/getuser/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setUpdatedUserData(data);
        
        } else {
          console.error(data.error || "Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);



  // Always show first image upon product change
  useEffect(() => { setActiveIdx(0); }, [product]);
  // Scroll to top when opening the page or switching product
  useEffect(() => { window.scrollTo(0, 0); }, [product]);
const handleCustomStyleSubmit = async () => {
  if (!uploadedImage) {
    alert("Please upload an image before submitting.");
    return;
  }

  try {
    const response = await fetch(uploadedImage);
    const blob = await response.blob();
    const file = new File([blob], "custom-design.png", { type: blob.type });

    const formData = new FormData();
    formData.append("image", file);
    formData.append("firstName", updatedUserData.firstName);
    formData.append("email", updatedUserData.email);
    formData.append("userId", userId);
    formData.append("productName", product.name);
    formData.append("selectedColor", selectedColor?.name || "");
    formData.append("productImages", JSON.stringify(product.images)); // 🔥 must stringify
    formData.append("productPrice", product.discountedPrice);
    formData.append("selectedSize", selectedSize);

    const res = await fetch("https://backend.abhinavsofficial.com/api/custom-style/submit", {
      method: "POST",
      body: formData, // 🔥 don't stringify or set headers manually
    });

    const result = await res.json();

    if (!res.ok) throw new Error(result.error || "Submission failed");

    toast.success("Custom design submitted successfully! Check your email for confirmation.");
  } catch (error) {
    console.error("Submission error:", error);
    toast.error("❌ Failed to submit custom style: " + error.message);
  }
};


  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product not found</h2>
        </div>
      </div>
    );
  }

  const images = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [FALLBACK_IMAGE];
  const activeImage = images[activeIdx] || FALLBACK_IMAGE;

  return (
    <div className="font-forumNormal min-h-screen bg-gray-50">
      <div className="bg-headerBackground">
        {/* Back Button (mobile/desktop) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 text-base font-medium mb-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="hidden xs:inline">Back</span>
            </button>
          )}
        </div>

        <div className="max-w-7xl mx-auto px-2 xs:px-3 sm:px-6 lg:px-8 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image and Gallery Section */}
            <div className="space-y-4 sm:space-y-6">
              {/* Main Image with overlay (relative container) */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow">
                {/* Main T-shirt Image */}
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover block"
                  onError={e => { e.target.src = FALLBACK_IMAGE; }}
                />

                {/* User design overlay (responsive, stays centered/contained on all screens) */}
                {uploadedImage && (
                  <img
                    src={uploadedImage}
                    alt="Your design"
                    className="absolute left-1/2 top-[45%] xs:top-[45%] sm:top-[46%]
                      w-[65%] xs:w-[60%] sm:w-[60%] md:w-[58%] lg:w-[53%] xl:w-[47%] 2xl:w-[45%]
                      h-auto aspect-square -translate-x-1/2 -translate-y-1/2
                      drop-shadow-lg pointer-events-none select-none"
                    style={{
                      objectFit: 'contain',
                      opacity: 0.94,
                      mixBlendMode: "multiply" // Use 'normal' if user design is not transparent
                    }}
                  />
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-xs font-semibold">DIGITAL PRINT</span>
                  {product.isPopular && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">POPULAR</span>
                  )}
                </div>
              </div>
              {/* Thumbnails below main image */}
              <div className="grid grid-cols-4 gap-2 md:gap-3">
                {images.map((img, idx) => (
                  <button
                    key={img + idx}
                    type="button"
                    aria-label={`View image ${idx + 1}`}
                    className={`aspect-square rounded-lg border-2 focus:outline-none transition duration-150 overflow-hidden
                      ${activeIdx === idx ? "border-indigo-500 shadow-lg" : "border-gray-200"}
                      hover:border-indigo-300`}
                    onClick={() => setActiveIdx(idx)}
                  >
                    <img
                      src={img}
                      alt={`${product.name} thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                      onError={e => { e.target.src = FALLBACK_IMAGE; }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details and Customization Column */}
            <div className="flex flex-col gap-8 sm:gap-10">
              {/* PRODUCT DETAILS */}
              <div className="bg-white/90 rounded-3xl shadow-xl px-4 sm:px-6 py-6 lg:p-8 border border-gray-100">
                <div className="flex items-center gap-2 sm:gap-4 mb-3 justify-between flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-semibold text-gray-700">{product.brand}</span>
                    <span className="inline-flex items-center gap-1 bg-yellow-100 px-2 py-0.5 rounded-full text-xs font-medium">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      {product.rating}
                      <span className="text-gray-500">({product.reviews})</span>
                    </span>
                  </div>
                  <span className="hidden sm:block text-sm bg-green-50 text-green-800 px-3 py-1 rounded-full font-semibold">
                    {product.discount}% OFF
                  </span>
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex flex-wrap items-end gap-3 mb-4">
                  <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                    ₹{product.discountedPrice}
                  </span>
                  <span className="text-lg sm:text-xl text-gray-400 line-through">
                    ₹{product.originalPrice}
                  </span>
                  <span className="sm:hidden text-xs bg-green-50 text-green-800 px-2 py-0.5 rounded font-bold">
                    {product.discount}% OFF
                  </span>
                </div>
            
                <div className="flex flex-wrap items-center gap-3 mt-2 mb-0">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded bg-blue-100 text-blue-900">
                    <Shield className="w-4 h-4" />Premium Quality
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded bg-green-100 text-green-900">
                    <Zap className="w-4 h-4" />Fast Delivery
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded bg-purple-100 text-purple-900">
                    <Clock className="w-4 h-4" />24hr Processing
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded bg-yellow-50 text-yellow-800">
                    <Sparkles className="w-4 h-4" />Custom Design
                  </span>
                </div>
              </div>

              {/* CUSTOMIZATION – Responsive, intuitive on all devices */}
              <div className="bg-gray-100 rounded-3xl shadow-lg px-4 sm:px-6 py-5 sm:py-6 lg:p-8">
                {/* SIZE SELECT */}
                <div className="mb-5">
                  <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">Choose Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => onSizeChange(size)}
                        className={`px-4 py-2 border-2 rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm ${
                          selectedSize === size
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 bg-white hover:border-blue-400'
                        }`}
                        aria-pressed={selectedSize === size}
                        type="button"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                {/* COLOR SELECT */}
                <div className="mb-5">
      <h3 className="font-semibold text-gray-900 mb-2 text-base sm:text-lg">Choose Color</h3>
      <div className="flex flex-wrap gap-2">
        {availableColors.map((color) => {
          const isSelected = selectedColor === color.name;
          return (
            <button
              key={color.name}
              onClick={() => onColorChange(color)}
              style={{
                backgroundColor: color.value,
                borderColor: isSelected ? "#0c3937" : "#ccc"
              }}
              className={`w-8 h-8 rounded-full border-4 shadow-sm transition-all duration-150 ease-in-out
                ${isSelected ? "scale-110 ring-2 ring-[#0c3937]" : "hover:scale-120 hover:ring-2 hover:ring-gray-500"}
                ${color.name === "white" ? "border-gray-300" : ""}`}
              aria-label={color.name}
              title={color.name}
              type="button"
            />
          );
        })}
      </div>
    </div>


                {/* DESIGN UPLOAD – below sizes/colors (for all devices) */}
                <DesignUpload
                  uploadedImage={uploadedImage}
                  onImageUpload={onImageUpload}
                 
                    onCustomizeSubmit={handleCustomStyleSubmit} 
                  isUploading={isUploading}
                  selectedProduct={product}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
