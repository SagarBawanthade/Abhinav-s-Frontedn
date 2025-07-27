// CustomStyle.jsx - Main Component
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Import all components
import ProductListing from "../components/ProductListing.jsx";
import ProductDetails from "../components/CustomizeProductDetails.jsx";
import DesignUpload from "../components/DesignUpload.jsx";
import SuccessModal from "../components/SuccessModal.jsx";
import CustomizeMarketingSection from "../components/CustomizeMarketingSection.jsx";


// Import data
import { tshirtProducts, availableColors } from "../data/tshirtData.js";

const CustomStyle = () => {
  const navigate = useNavigate();
  const { productId } = useParams();

  // Product state
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Customization state
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [uploadedImage, setUploadedImage] = useState(null);
  
  // UI state
  const [isUploading, setIsUploading] = useState(false);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle URL parameter changes
  useEffect(() => {
    if (productId) {
      const product = tshirtProducts.find((p) => String(p.id) === String(productId));
      if (product) {
        setSelectedProduct(product);
        setSelectedColor(availableColors[0].name); // Set first available color as default
      } else {
        // Product not found, redirect to listing
        navigate("/custom-style");
      }
    } else {
      // Reset state when going back to listing
      resetProductState();
    }
  }, [productId, navigate]);

  // Reset all product-related state
  const resetProductState = () => {
    setSelectedProduct(null);
    setSelectedColor('');
    setUploadedImage(null);
    setIsUploading(false);
    setShowUploadSuccess(false);
    setSelectedSize('M');
  };

  // Navigation handlers
  const handleProductClick = (product) => {
    navigate(`/custom-style/${product.id}`);
  };

  const handleBack = () => {
    navigate("/custom-style");
  };

  // Customization handlers
  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCustomizeSubmit = async () => {
    if (!uploadedImage) {
      alert("Please upload a design first!");
      return;
    }

    if (!selectedColor) {
      alert("Please select a color!");
      return;
    }

    setIsUploading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically make an API call to submit the customization
      console.log('Customization Data:', {
        product: selectedProduct,
        size: selectedSize,
        color: selectedColor,
        design: uploadedImage,
        timestamp: new Date().toISOString()
      });
      
      setIsUploading(false);
      setShowUploadSuccess(true);
    } catch (error) {
      setIsUploading(false);
      console.error('Error submitting customization:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  const handleModalClose = () => {
    setShowUploadSuccess(false);
    navigate("/custom-style");
  };

  // Render product details view
  if (productId && selectedProduct) {
    return (
      <>
        <ProductDetails
          product={selectedProduct}
          selectedSize={selectedSize}
          onSizeChange={handleSizeChange}
          selectedColor={selectedColor}
           onColorChange={(colorObj) => setSelectedColor(colorObj)}
          uploadedImage={uploadedImage}
          onImageUpload={handleImageUpload}
          onCustomizeSubmit={handleCustomizeSubmit}
          isUploading={isUploading}
          onBack={handleBack}
        />
        
        <SuccessModal
          isVisible={showUploadSuccess}
          onClose={handleModalClose}
          productName={selectedProduct.name}
        />
      </>
    );
  }

  // Render product listing view
  return (
    <ProductListing onProductClick={handleProductClick} />
  );
};

export default CustomStyle;