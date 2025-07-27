// components/SuccessModal.jsx
import React from "react";
import { Check, X } from "lucide-react";

const SuccessModal = ({ isVisible, onClose, productName }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Design Added!</h3>
        
        <p className="text-gray-600 mb-4">
          Your custom design for <span className="font-medium">{productName}</span> has been received. 
          We will contact you soon at your registered email address with order details.
        </p>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-green-700">
            <strong>Next Steps:</strong>
            <br />
            1. Check your email for order confirmation
            <br />
            2. Our team will review your design
            <br />
            3. Production will begin within 24 hours
          </p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors font-medium"
          >
            Continue Shopping
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;