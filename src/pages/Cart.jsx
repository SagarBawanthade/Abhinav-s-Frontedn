import { useEffect, useRef, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Import delete icon from react-icons
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Unisex Snowman Hoodie',
      price: 1000,
      color: 'Red',
      size: 'L',
      quantity: 2,
      image: '/images/shoplogo.jpg',
    },
    {
      id: 2,
      name: 'Unisex Lavender Edition Hoodies',
      price: 500,
      color: 'Blue',
      size: 'M',
      quantity: 1,
      image: '/images/shoplogo.jpg',
    },
  ]);

  // Function to handle deleting a cart item
  const handleDelete = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  // Calculate Subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const delivery = 100; // Delivery fee
  const tax = 799; // Tax
  const total = subtotal + delivery + tax;



   const Cart = useRef(null);
    
      // Adjusting scroll behavior with offset to account for potential fixed header or margin
      useEffect(() => {
        if (Cart.current) {
          window.scrollTo({
            top: Cart.current.offsetTop - 50,  // Adjust the offset (50px for header)
            behavior: "smooth", // Smooth scroll
          });
        }
      }, []);
    



  return (
    <section  ref={Cart} className="bg-headerBackGround py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="font-forumNormal text-gray-900 dark:text-white text-3xl  ">My Cart</h2>

        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
            <div className="space-y-6 font-forumNormal">
              {/* Map through cart items */}
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="relative rounded-lg border border-gray-300 bg-headerBackGround p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                >
                  <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                    <a href="#" className="shrink-0 md:order-1">
                      <img className="h-28 w-28" src={item.image} alt={item.name} />
                    </a>

                    <label htmlFor={`counter-input-${item.id}`} className="sr-only">
                      Choose quantity:
                    </label>
                    <div className="flex items-center justify-between md:order-3 md:justify-end">
                      <div className="flex items-center">
                        <button
                          type="button"
                          id={`decrement-button-${item.id}`}
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          id={`counter-input-${item.id}`}
                          className="w-10 shrink-0 text-lg font-forumNormal border-0 bg-transparent text-center text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                          value={item.quantity}
                          readOnly
                        />
                        <button
                          type="button"
                          id={`increment-button-${item.id}`}
                          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-end md:order-4 md:w-32">
                        <p className="text-lg font-forumNormal font-semibold text-gray-900 dark:text-white">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                    <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                      <p className="text-2xl font-forumNormal text-gray-900 hover:underline dark:text-white">{item.name}</p>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <p className='text-black text-lg font-forumNormal'>Color: <span className="font-forumNormal  text-black">{item.color}</span></p>
                        <p className='font-forumNormal text-black text-lg'>Size: <span className="font-forumNormal text-black">{item.size}</span></p>
                      </div>
                    </div>

                    {/* Delete button positioned bottom-right */}
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      className="absolute bottom-2 right-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-500"
                    >
                      <FaTrashAlt className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
            <div className="space-y-4 rounded-lg border border-gray-300 bg-headerBackGround p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-3xl font-forumNormal text-gray-900 dark:text-white">Order summary</p>

              <div className=" font-avenir space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="font-forumNormal text-gray-500 dark:text-gray-400">Subtotal</dt>
                    <dd className=" text-gray-900 dark:text-white">₹{subtotal}</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4">
                    <dt className=" font-forumNormal text-gray-500 dark:text-gray-400 mb-6">Delivery</dt>
                    <dd className=" font-forumNormal text-green-600">-₹FREE</dd>
                  </dl>


                  <p5 className="font-forumNormal underline   text-green-600 dark:text-green-600">Maharashtra, India</p5>
                  {/* <dl className="flex items-center justify-between gap-4">
                    <dt className="font-forumNormal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                    <dd className="font-forumNormal text-gray-900 dark:text-white">₹{99}</dd>
                  </dl> */}

                  {/* <dl className="flex items-center justify-between gap-4">
                    <dt className="font-forumNormal text-gray-500 dark:text-gray-400">Tax</dt>
                    <dd className="font-forumNormal text-gray-900 dark:text-white">₹{tax}</dd>
                  </dl> */}
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                  <dt className="font-forumNormal text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                  <dd className="font-forumNormal text-lg font-bold text-gray-900 dark:text-white">₹{total}</dd>

                 
                </dl>
              </div>

              <button href="#" className="flex w-full text-lg items-center justify-center font-forumNormal bg-homePage px-5 py-2.5  text-white hover:opacity:1 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</button>

              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                  Continue Shopping
                  <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
