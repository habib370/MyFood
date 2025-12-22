import { useState ,useContext} from "react";
import "./App.css";
import { Navbar } from "./components/Navbar.jsx";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Cart } from "./pages/Cart.jsx";
import { PlaceOrder } from "./pages/PlaceOrder.jsx";
import { Delivery } from "./pages/Delivery.jsx";
import { LoginPopup } from "./components/LoginPopup.jsx";
import { Footer } from "./components/Footer.jsx";
import { Myorders } from "./pages/Myorders.jsx";
import { MobileNavbar } from "./components/MobileNavbar.jsx";
import { Profile } from "./pages/Profile.jsx";
import {EditProfile} from './pages/EditProfile.jsx'
import {SingleFoodItem} from './pages/SIngleFoodItem.jsx'
import {StoreContext} from './context/StoreContext.jsx'
import { Slide } from 'react-toastify';
function App() {
  
  const { showLogInPopUp, setShowLogInPopUp } = useContext(StoreContext);
  return (
    <div className="flex flex-col min-h-screen">
      {showLogInPopUp && <LoginPopup />}
      <div className="hidden md:block">
        <Navbar  />
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden">
        <MobileNavbar  />
      </div>

      <main className="flex-1 ">
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/item/:itemId" element={<SingleFoodItem />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/my-orders" element={<Myorders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </main>

      <Footer />
     
    </div>
  );
}

export default App;
