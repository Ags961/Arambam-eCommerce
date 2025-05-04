import React from 'react';
import { Routes, Route } from 'react-router-dom';

// ✅ Import Pages
import Home from './pages/Home';
import Collection from './pages/Collection';
import SaleItems from './pages/SaleItems';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrder from './pages/PlaceOrder';
import Orders from './pages/Orders';
import Verify from './pages/Verify';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Delivery from './pages/Delivery';

// ✅ Import Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';

// ✅ Import Toast notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ App Component - Root of the entire application
const App = () => {
  return (
    <div className="flex flex-col min-h-screen">

      {/* ✅ Global Toast Notifications */}
      <ToastContainer />

      {/* ✅ Navigation Bar */}
      <Navbar />

      {/* ✅ Search Bar Component (appears conditionally) */}
      <SearchBar />

      {/* ✅ Main Page Content */}
      <div className="flex-grow px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <Routes>

          {/* ✅ Route Definitions */}
          <Route path='/' element={<Home />} />
          <Route path='/collection' element={<Collection />} />
          <Route path='/sale' element={<SaleItems />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productId' element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/delivery' element={<Delivery />} />

        </Routes>
      </div>

      {/* ✅ Footer Component */}
      <Footer />

    </div>
  );
};

export default App;