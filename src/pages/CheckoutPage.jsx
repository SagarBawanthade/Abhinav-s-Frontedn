import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
const razorpayKeyId = import.meta.env.RAZORPAY_KEY_ID;
console.log("razorpayKeyId : ",razorpayKeyId);

const CheckoutPage = () => {

  const cartItems = useSelector((state) => state.cart.items);
  const userId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
 
  const isLoggedIn = Boolean(userId && token);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "Razorpay",
  });
  const deliveryCharges = 0;
  const totalCartPrice = cartItems.reduce((acc, product) => {
  const productTotal = product.quantity * product.price;
  const additionalCost = product.giftWrapping ? product.quantity * 30 : 0;
  return acc + productTotal + additionalCost + deliveryCharges;
  }, 0);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if (!isLoggedIn) {
      toast.error("You must be logged in to place an order.");
      navigate("/login"); // Redirect to login page
      return;
    }

    if(formData.firstName === "" || formData.lastName === "" || formData.email === "" || formData.phoneNo === "" || formData.address === "" || formData.city === "" || formData.state === "" || formData.zipCode === "") {              
      toast.error("Please fill all the fields");
      return;
    }
 
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email address");
      return;
    }

    if (!phoneRegex.test(formData.phoneNo)) {
      toast.error("Invalid phone number");
      return;
    }


   
    // Prepare data for the backend
    const orderData = {
      user: {
        email: formData.email,
        id:userId
      },
      contactInformation: {
        email: formData.email,
        phone: formData.phoneNo,
      },
      shippingInformation: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: "N/A",
        address: formData.address,
        apartment: "",
        city: formData.city,
        state: formData.state,
        postalCode: formData.zipCode,
        country: "India", // Default country
      },
      paymentInformation: {
        method: formData.paymentMethod,
      },
      orderSummary: {
        items: cartItems.map((item) => ({
          product: item.product._id, // Ensure product ID is sent
          productName: item.name,
          productImage: item.images,
          price: item.price,
          quantity: item.quantity,
          size: item.size || "N/A",
          color: item.color || "N/A",
          giftWrapping: item.giftWrapping || false,
        })),
        subtotal: totalCartPrice,
        shipping: 50, // Assume a fixed shipping cost
        taxes: totalCartPrice * 0.18, // Example: 18% GST
        total: totalCartPrice + 50 + totalCartPrice * 0.18,
      },
    };
    setLoading(true);

    try {
      // Step 1: Create Razorpay order on the backend
      const razorpayOrder = await axios.post(
        "http://localhost:5000/api/order/create-razorpay-order",
        { amount: (totalCartPrice +0  + totalCartPrice * 0.05) * 100 } // Convert to paise
      );
  
      const { orderId } = razorpayOrder.data;
      console.log("Razorpay Order ID:", orderId);
      if (!orderId) throw new Error("Failed to create Razorpay order");
  
      // Step 2: Load Razorpay SDK script
      const isScriptLoaded = await loadRazorpayScript();
      setLoading(false);
      if (!isScriptLoaded) {
        toast.error("Failed to load Razorpay SDK.");
        return;
       
      }

      const options = {
        key: razorpayKeyId,
        amount: (totalCartPrice + 1 + totalCartPrice * 0.05) * 100, // Convert to paise
        currency: "INR",
        name: "Abhinav's - Best of World",
        description: "Payment for your order",
        image: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/IMG_0823.JPG",
        order_id: orderId,
        handler: async (response) => {
          try {
            const verifyPayment = await axios.post(
              "http://localhost:5000/api/order/verify-razorpay-payment",
              response
            );
            console.log("paymentResponse:", response);
            console.log("Verify Payment:", verifyPayment);
      
            if (verifyPayment.status === 200) {
              const finalizedOrderData = {
                ...orderData,
                paymentInformation: { method: "Razorpay", ...response },
              };
      
              const orderResponse = await axios.post(
                "http://localhost:5000/api/order/create-order",
                finalizedOrderData
              );

              console.log("orderResponse:", orderResponse);
              console.log("Order Data:", finalizedOrderData);
              toast.success("Order placed successfully!");
              navigate("/order-confirm");
              setLoading(false);
            } else {
              toast.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Error during payment verification:", error);
            toast.error("Payment verification failed. Please try again.");
            setLoading(false);
           navigate("/order-fail");
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phoneNo, // Use phoneNo as per your formData structure
        },
        theme: {
          color: "#3399cc",
        },
      };

// Step 6: Open Razorpay checkout
      const razorpay = new window.Razorpay(options);
      razorpay.open();
  
      razorpay.on("payment.failed", (response) => {
        console.error("Payment failed:", response);
        toast.error("Payment failed. Please try again.");
        navigate("/order-fail");
        setLoading(false);
      });
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Failed to initiate payment. Please try again.");
      setLoading(false);
    }
};

const location = useLocation();
  
useEffect(() => {
  window.scrollTo(0, 0); // Scroll to top of the page
}, [location]);

  return (
    <div className="font-sans bg-headerBackGround min-h-screen p-4">
      <div className="container mx-auto grid lg:grid-cols-3 gap-8">
        {/* Sidebar Section */}
        <div className="bg-headerBackGround border border-gray-300 rounded-lg shadow-md lg:col-span-1 max-h-full">

        {/* <div className="bg-headerBackGround border border-gray-300 rounded-lg shadow-md lg:col-span-1"> */}

       
          <div className="px-6 py-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-forumNormal">
              Your Cart
            </h2>
            <div className="space-y-6">
              {cartItems.map((product, index) => {
               
                const productTotal = product.quantity * product.price;
                const additionalCost = product.giftWrapping ? product.quantity * 30 : 0;
                const finalPrice = productTotal + additionalCost
               

                return (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="w-24 h-24 flex-shrink-0 bg-headerBackGround rounded-md p-1">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-base font-medium text-gray-800">{product.name}</h3>
                        {product.giftWrapping && (
                          <span className="ml-2 text-red-500 text-xl">🎁</span>
                        )}
                      </div>
                      <ul className="text-sm text-gray-600 mt-2 space-y-1">
                        <li className="flex justify-between">
                          <span>Size:</span> <span>{product.size}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Quantity:</span> <span>{product.quantity}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Total Price:</span>{" "}
                          <span>₹{finalPrice.toLocaleString()}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-headerBackGround px-6 py-4 border-gray-300 border-t">
          <dl className="flex items-center justify-between gap-4">
                      <dt className="font-forumNormal text-gray-500 dark:text-gray-400 font-semibold">Delivery</dt>
                      <dd className="font-forumNormal text-green-600">-₹100</dd>
                    </dl>
            <h4 className="flex justify-between text-lg font-semibold text-gray-800">
              Total: <span>₹{totalCartPrice.toLocaleString()}</span>
            </h4>
            

          </div>
        </div>

        {/* Checkout Form */}
        <div className="bg-headerBackGround border font-forumNormal border-gray-300 rounded-lg shadow-md lg:col-span-2 px-6 py-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Complete Your Order
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Personal Details */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Personal Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: "firstName", placeholder: "First Name" },
                  { name: "lastName", placeholder: "Last Name" },
                  { name: "email", placeholder: "Email" },
                  { name: "phoneNo", placeholder: "Phone No." },
                ].map((field, index) => (
                  <input
                    key={index}
                    type={field.name === "email" ? "email" : field.name === "phoneNo" ? "tel" : "text"}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="px-4 py-3 bg-headerBackGround border border-gray-300 rounded-md text-gray-800 text-sm"
                  />
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Shipping Address</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: "address", placeholder: "Address Line" },
                  { name: "city", placeholder: "City" },
                  { name: "state", placeholder: "State" },
                  { name: "zipCode", placeholder: "Zip Code" },
                ].map((field, index) => (
                  <input
                    key={index}
                    type="text"
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="px-4 py-3 bg-headerBackGround border border-gray-300 rounded-md text-gray-800 text-sm"
                  />
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Payment Method</h3>
              <div className="flex items-center gap-4">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Razorpay"
                  checked
                  readOnly
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label>Razorpay</label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-homePage text-white text-lg rounded-md hover:bg-gray-900"
            >
            {loading ? <Spinner/> : "Place Order"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
