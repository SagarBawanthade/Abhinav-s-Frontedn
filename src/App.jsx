import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/HomePage.jsx";
import ShopNowPage from "./pages/ShopNowPage.jsx";
import HoodiesPage from "./pages/HoodiesPage.jsx";
import Fandom from "./pages/Fandom.jsx";
import InstagramPage from "./pages/InstaGramPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import Shop from "./pages/Shop.jsx";
import Cart from "./pages/Cart.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/LoginPage.jsx";
import PolicyPage from "./pages/PolicyPage.jsx";
import TermsAndConditions from "./pages/Terms.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import WishList from "./pages/WishList.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import OrderConfirmationPage from "./pages/OrderConfirmationPage.jsx";
import OrderFailedPage from "./pages/OrderFailedPage.jsx";
import OrderHistory from "./pages/OrderHistory.jsx";
import AdminLayout from "./pages/AdminLayout.jsx";

import OrderDetails from "./components/admin/OrderDetails.jsx";
import ManageUser from "./components/admin/ManageUser.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ManageOrders from "./components/admin/ManageOrders.jsx";
import ManageProducts from "./components/admin/ManageProducts.jsx";
import AddProduct from "./components/admin/AddProduct.jsx";
import EditProduct from "./components/admin/EditProduct.jsx";
import CategoryProductsPage from "./components/admin/CategoryProducts.jsx";

function App() {
  const location = useLocation(); // Get the current location

  // Check if the current path starts with "/admin"
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isShopRoute = location.pathname === "/shop" || location.pathname.startsWith("/shop/");

  return (
    <>
      {/* Show Header only for non-admin routes */}
      {!isAdminRoute && <Header />} 

      <Routes>
        {/* Main User Routes */}
        <Route path="/" element={
          <>
            <HomePage /> {/* Render HomePage */}
            <ShopNowPage /> {/* Render ShopNowPage */}
            <HoodiesPage /> {/* Render HoodiesPage */}
         <Fandom />   
            <InstagramPage /> {/* Render InstagramPage */}
            <ServicesPage /> {/* Render ServicesPage */}
          </>
        } />
         <Route path="/shop" element={<Shop />} />
       <Route path="/shop/:category" element={<Shop />} />
       <Route path="/shop/tag/:tag" element={<Shop />} />
        
        <Route path="/cart" element={<Cart />} />
        <Route path="/product-details/:productId" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/privacy" element={<PolicyPage />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/wish-list" element={<WishList />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirm" element={<OrderConfirmationPage />} />
        <Route path="/order-fail" element={<OrderFailedPage />} />
        <Route path="/order-history" element={<OrderHistory />} />
      
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="users" element={<ManageUser />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="orders/order-details/:orderId" element={<OrderDetails />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="update-product/:productId" element={<EditProduct />} />
          <Route path="/admin/category/:category" element={<CategoryProductsPage />} />
        </Route>
      </Routes>

      {/* Show Footer only for non-admin routes */}
      {!isAdminRoute && !isShopRoute && <Footer />}
    </>
  );
}

export default App;





