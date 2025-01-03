import { Link } from "react-router-dom";
import { FaTimesCircle,FaHistory, FaShoppingCart } from "react-icons/fa";

const OrderFailedPage = () => {
  return (
    <section className="bg-headerBackGround py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto bg-headerBackGround max-w-3xl px-4 2xl:px-0">
        <div className="text-center mb-8">
          <FaTimesCircle className="mx-auto text-red-500 text-6xl mb-4" />
          <h2 className="text-3xl font-semibold font-forumNormal text-gray-900 dark:text-white sm:text-4xl mb-4">
            Order Failed
          </h2>
          <p className="text-gray-500 font-forumNormal dark:text-gray-400 text-lg mb-6 md:mb-8">
            Unfortunately, there was an issue processing your order{' '}
             Please review the information or contact our support team for assistance.
          </p>
        </div>

        

        <div className="flex items-center justify-center space-x-6 sm:space-x-8">
          <Link
            to="/order-history"
            className="text-white bg-homePage hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-lg px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 flex items-center gap-2"
          >
            <FaHistory />
            View your Orders
          </Link>
          <Link
            to="/shop"
            className="py-2 px-4 text-lg font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 flex items-center gap-2"
          >
            <FaShoppingCart />
            Return to shopping
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OrderFailedPage;
