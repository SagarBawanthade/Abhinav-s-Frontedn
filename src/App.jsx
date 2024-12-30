import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import ShopNowPage from './pages/ShopNowPage.jsx';
import HoodiesPage from './pages/HoodiesPage.jsx';
import InstagramPage from './pages/InstaGramPage.jsx';
import ServicesPage from './pages/ServicesPage.jsx';
import Shop from './pages/Shop.jsx';
import Cart from './pages/Cart.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/LoginPage.jsx';
import PolicyPage from './pages/PolicyPage.jsx';
import TermsAndConditions from './pages/Terms.jsx';
import UserProfile from './pages/UserProfile.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';


function App() {
  return (
    <BrowserRouter>
      <Header /> 
    
      
      {/* Set up routes for the different pages */}
      <Routes>
        {/* Define Route Paths */}
        <Route path="/" element={<HomePage />} />  {/* Default route, HomePage */}
        <Route path="/shop-now" element={<ShopNowPage />} />
        <Route path="/hoodies" element={<HoodiesPage />} />
        <Route path="/instagram" element={<InstagramPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/shop" element={<Shop />} />
       <Route path="/cart" element={<Cart />} /> 
       <Route path='/product-details' element={<ProductDetails/>} />{/* Render Shop when route is /shop */}
       <Route path='/login' element={<Login/>} />
       <Route path='/register' element={<Register/>} />
       <Route path='/forgot-password' element={<ForgotPassword/>} />
       <Route path='/user-profile' element={<UserProfile/>} />
       <Route path='/privacy' element={<PolicyPage/>} />
       <Route path='/terms' element={<TermsAndConditions/>} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
 
export default App;
