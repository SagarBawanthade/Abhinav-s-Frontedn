import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { CreditCard, Package, Truck, Mail, Phone, User, Home, MapPin } from "lucide-react";
import useCartManagement from "../components/CartManagamnet.jsx";

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

const Spinner = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
  </div>
);

// Input Field Component
const InputField = ({ icon: Icon, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon className="h-5 w-5 text-gray-400" />
    </div>
    <input
      {...props}
      className="pl-10 w-full px-4 py-3 bg-headerBackGround border border-gray-200 rounded-lg text-gray-800 text-sm  transition duration-200"
    />
  </div>
);


const CheckoutPage = () => {

  const cartItems = useSelector((state) => state.cart.items);
  const userId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const [loading, setLoading] = useState(false);
 const dispatch = useDispatch();
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
      navigate("/login");
      return;
    }
  
    // Validate form fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNo ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode
    ) {
      toast.error("Please fill all the fields");
      return;
    }
  
    // Validate email and phone number
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
  
    const amount = calculateTotalPrice();
    // Prepare order data
    const orderData = {
      user: { email: formData.email, id: userId },
      contactInformation: { email: formData.email, phone: formData.phoneNo },
      shippingInformation: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.zipCode,
        country: "India",
      },
      paymentInformation: { method: formData.paymentMethod },
      orderSummary: {
        items: cartItems.map((item) => ({
          product: item.product._id,
          productName: item.name,
          productImage: item.images,
          price: item.price,
          quantity: item.quantity,
          size: item.size || "N/A",
          color: item.color || "N/A",
          giftWrapping: item.giftWrapping || false,
        })),
        subtotal: amount,
        shipping: 0,
        taxes: 0,
        total: amount,
      },
    };
  
    setLoading(true);
  
    try {
      // Create Razorpay order
      const amountInPaise = (amount) * 100;
      const razorpayOrder = await axios.post(
        "https://backend.abhinavsofficial.com/api/order/create-razorpay-order",
        { amount: amountInPaise }
      );
      const { orderId } = razorpayOrder.data;
      if (!orderId) throw new Error("Failed to create Razorpay order");
  
      // Load Razorpay script
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error("Failed to load Razorpay SDK.");
        setLoading(false);
        return;
        
      }
  
      // Razorpay options
      const options = {
        key: razorpayKeyId,
        amount: amountInPaise,
        currency: "INR",
        name: "Abhinav's - Best of World",
        description: "Payment for your order",
        image: "https://abhinavs-storage-09.s3.ap-south-1.amazonaws.com/products/IMG_0823.JPG",
        order_id: orderId,
        
        handler: async (response) => {
          try {
            console.log("Payment Response:", response);
        
            const verificationPayload = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            
           
            };
        
            console.log("Verification Payload:", verificationPayload);
        
            const verifyPayment = await axios.post(
              "https://backend.abhinavsofficial.com/api/order/verify-razorpay-payment",
              verificationPayload
            );
        
            if (verifyPayment.status !== 200) {
              toast.error("Payment verification failed.");
              navigate("/order-fail");
              return;
            }
        
            const finalizedOrderData = {
              ...orderData,
              paymentInformation: {
                method: "Razorpay",
                ...verificationPayload,
              },
            };
        
            
            const orderResponse = await axios.post("https://backend.abhinavsofficial.com/api/order/create-order", finalizedOrderData);
        
            
            const sendEmail = await axios.post("https://backend.abhinavsofficial.com/api/order/send-email", orderResponse);
              
              
              
            toast.success("Order placed successfully!");
            navigate("/order-confirm");
        
          } catch (error) {
            
            toast.error("Payment verification failed. Please try again.");
            navigate("/order-fail");
          }
        },
        
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phoneNo,
        },
        theme: { color: "#3399cc" },
        modal: {
          ondismiss: function() {
            setLoading(false);
            document.body.style.overflow = 'auto';
            window.location.reload();
          }
        }
      };
  
      // Open Razorpay modal
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
  useCartManagement();
 
const location = useLocation();
  
useEffect(() => {
  window.scrollTo(0, 0); // Scroll to top of the page
}, [location]);


const checkSpecialTshirtOffer = (cartItems) => {
  const tshirts = cartItems.filter(item => {
    const name = item.name || (item.product && item.product.name);
    return name.toLowerCase().includes('t-shirt') && item.quantity === 1;
  });
  
  return tshirts.length === 2;
};

// Function to calculate product price
const calculateProductPrice = (product) => {
  const productDetails = {
    name: product.name || (product.product && product.product.name),
    price: product.price,
    quantity: product.quantity,
    giftWrapping: product.giftWrapping
  };

  const additionalCost = productDetails.giftWrapping ? productDetails.quantity * 30 : 0;
  return (productDetails.price * productDetails.quantity) + additionalCost;
};

// Calculate total cart price with special offer
const calculateTotalPrice = () => {
  if (checkSpecialTshirtOffer(cartItems)) {
    // Apply special price of 1299 for the t-shirts
    const nonTshirtItems = cartItems.filter(item => {
      const name = item.name || (item.product && item.product.name);
      return !name.toLowerCase().includes('t-shirt');
    });

    const nonTshirtTotal = nonTshirtItems.reduce((total, item) => {
      return total + calculateProductPrice(item);
    }, 0);

    return nonTshirtTotal + 1299; // Special price for 3 t-shirts
  }

  // Regular price calculation
  return cartItems.reduce((total, item) => {
    return total + calculateProductPrice(item);
  }, 0);
};

if (loading) {
  return (
   
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-[3px] flex justify-center items-center z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        
      </div>
   
  );
}


  return (
    <div className="font-forumNormal bg-headerBackGround min-h-screen p-4">
      <div className="container mx-auto max-w-7xl">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center lg:text-left">
          Checkout
        </h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Summary */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-headerBackGround rounded-xl shadow-sm border border-gray-200 sticky top-4">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Package className="h-5 w-5 text-gray-600" />
                  <h2 className="text-xl font-semibold text-gray-800">Your Cart</h2>
                </div>
                
                <div className="space-y-6 divide-y divide-gray-100">
                  {cartItems.map((product, index) => {
                    const productDetails = {
                      name: product.name || (product.product && product.product.name),
                      images: product.images || (product.product && product.product.images),
                      price: calculateProductPrice(product),
                      quantity: product.quantity,
                      size: product.size,
                      color: product.color,
                      giftWrapping: product.giftWrapping
                    };

                    return (
                      <div key={index} className="pt-6 first:pt-0">
                        <div className="flex gap-4">
                          <div className="w-20 h-20 rounded-lg border border-gray-300 overflow-hidden bg-headerBackGround">
                            <img
                              className="w-full h-full object-cover"
                              src={Array.isArray(productDetails.images)
                                ? productDetails.images[0]
                                : productDetails.images || productDetails.image}
                              alt={productDetails.name}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-gray-800">{productDetails.name}</h3>
                              {productDetails.giftWrapping && (
                                <span className="text-xl" title="Gift Wrapped">🎁</span>
                              )}
                            </div>
                            <div className="mt-2 space-y-1 text-sm text-gray-600">
                              <p>Size: {productDetails.size}</p>
                              <p>Quantity: {productDetails.quantity}</p>
                              {productDetails.color && <p>Color: {productDetails.color}</p>}
                              <p className="font-medium text-gray-800">
                                ₹{productDetails.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="border-t border-gray-200 p-6 bg-headerBackGround rounded-b-xl">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-green-600">
                      <Truck className="h-5 w-5" />
                      <span>Free Delivery</span>
                    </div>
                    <span className="text-green-600">₹0</span>
                  </div>
                  
                  {checkSpecialTshirtOffer(cartItems) && (
                    <div className="flex justify-between items-center text-green-600 bg-green-50 p-3 rounded-lg">
                      <span>Special T-shirt Offer Applied!</span>
                      <span>2 T-shirts for ₹699</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center text-lg font-semibold pt-2">
                    <span>Total</span>
                    <span>₹{calculateTotalPrice().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-headerBackGround rounded-xl shadow-sm border border-gray-200 p-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Details */}
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <User className="h-5 w-5 text-gray-600" />
                    <h2 className="text-xl font-semibold text-gray-800">Personal Details</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <InputField
                      icon={User}
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    <InputField
                      icon={User}
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    <InputField
                      icon={Mail}
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <InputField
                      icon={Phone}
                      type="tel"
                      name="phoneNo"
                      placeholder="Phone Number"
                      value={formData.phoneNo}
                      onChange={handleChange}
                    />
                  </div>
                </section>

                {/* Shipping Address */}
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <Home className="h-5 w-5 text-gray-600" />
                    <h2 className="text-xl font-semibold text-gray-800">Shipping Address</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <InputField
                        icon={Home}
                        name="address"
                        placeholder="Address Line"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </div>
                    <InputField
                      icon={MapPin}
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                    />
                    <InputField
                      icon={MapPin}
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                    />
                    <InputField
                      icon={MapPin}
                      name="zipCode"
                      placeholder="ZIP Code"
                      value={formData.zipCode}
                      onChange={handleChange}
                    />
                  </div>
                </section>

                {/* Payment Method */}
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <h2 className="text-xl font-semibold text-gray-800">Payment Method</h2>
                  </div>
                  <div className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="Razorpay"
                      checked
                      readOnly
                      className="h-4 w-4 border-gray-300 text-gray-600 accent-gray-500 focus:ring-gray-500"
                    />
                    <label className="flex items-center gap-2 cursor-pointer">
                      <CreditCard className="h-5 w-5 text-gray-600" />
                      <span>Razorpay</span>
                    </label>
                  </div>
                </section>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-gray-800 text-white text-lg rounded-lg hover:bg-gray-700 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:bg-gray-800"
                >
                  {loading ? (
                    <Spinner />
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Place Order
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
