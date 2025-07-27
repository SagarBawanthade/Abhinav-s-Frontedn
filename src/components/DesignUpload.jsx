// components/DesignUpload.jsx
import React from "react";
import { Camera, Upload, Sparkles } from "lucide-react";

const DesignUpload = ({ 
  uploadedImage, 
  onImageUpload, 
  onCustomizeSubmit, 
  isUploading, 
  selectedProduct 
}) => {
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert("Please select a valid image file");
      return;
    }
    
    onImageUpload(file);
  };

  return (
    <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Camera className="w-6 h-6 text-[#0c3937]" />
        Upload Your Design
      </h2>
      
      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors duration-300">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="design-upload"
        />
        
        <label htmlFor="design-upload" className="cursor-pointer">
          {uploadedImage ? (
            <div className="space-y-4">
              <img 
                src={uploadedImage} 
                alt="Uploaded design" 
                className="w-32 h-32 object-cover rounded-xl mx-auto border-4 border-blue-200"
              />
              <p className="text-sm text-gray-600">Click to change design</p>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="w-16 h-16 text-gray-400 mx-auto" />
              <div>
                <p className="text-lg font-semibold text-gray-700">Upload Your Design</p>
                <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                <p className="text-xs text-gray-400 mt-1">
                  Recommended: 300 DPI, Square format
                </p>
              </div>
            </div>
          )}
        </label>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-medium text-blue-800 mb-1">Design Guidelines:</h4>
        <ul className="text-xs text-blue-600 space-y-1">
          <li>• High-resolution images work best</li>
          <li>• Avoid copyrighted content</li>
          <li>• Keep text readable and bold</li>
        </ul>
      </div>
      
      <button
        onClick={onCustomizeSubmit}
        disabled={!uploadedImage || isUploading}
        className={`w-full mt-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
          uploadedImage && !isUploading
            ? 'bg-[#0c3937] hover:bg-gray-700 text-white transform hover:scale-[1.02] shadow-lg'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isUploading ? (
          <div className="flex items-center justify-center gap-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Processing...
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Request Design - ₹{selectedProduct?.discountedPrice || 0}
          </div>
        )}
      </button>
    </div>
  );
};

export default DesignUpload;