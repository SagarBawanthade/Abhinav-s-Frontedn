const PromoBadge = ({ product }) => {
    // Define category-wise discount mapping
    const discountMapping = {
      "Oversize-Tshirt": "60% OFF",
      "Tshirt": "50% OFF",
      "Hoodies": "30% OFF",
      "Couple-Tshirt": "40% OFF",
    };
  
    // Get discount based on category or set a default message
    const discountText = discountMapping[product.category] || "Special Offer";
  
    return (
      <div className="flex items-center text-xs justify-center bg-red-500 rounded-md text-white  h-7 w-24 shadow-md">
        <span className="font-forumNormal font-semibold">{discountText}</span>
      </div>
    );
  };
  
  export default PromoBadge;
  