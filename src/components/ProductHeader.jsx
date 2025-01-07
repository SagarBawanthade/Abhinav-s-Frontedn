import { useState } from 'react';
import { Share2 } from 'lucide-react';

const ProductHeader = ({ product }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      try {
        // Check if clipboard API is available
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(window.location.href);
          setShowTooltip(true);
          setTimeout(() => setShowTooltip(false), 2000);
        } else {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = window.location.href;
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand('copy');
            setShowTooltip(true);
            setTimeout(() => setShowTooltip(false), 2000);
          } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
          }
          document.body.removeChild(textArea);
        }
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  return (
    <div className="flex items-center justify-between mb-4 relative">
 
      <div className="relative">
        <button
          onClick={handleShare}
          className="ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 border border-gray-200"
          title="Share product"
        >
          <Share2 className="h-4 w-4 text-gray-600" />
        </button>
        {showTooltip && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-sm text-white bg-gray-800 rounded whitespace-nowrap">
            Copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductHeader;