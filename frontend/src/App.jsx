import { useState ,useContext,useEffect} from "react";
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
import ReturnPolicy from './pages/ReturnPolicy.jsx'
import AboutUs from './pages/AboutUs.jsx'
import { ExploreMenu } from "./components/ExploreMenu.jsx";
function App() {
  
  const { showLogInPopUp, setShowLogInPopUp } = useContext(StoreContext);
   const [isExploreVisible, setIsExploreVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlExploreMenu = () => {
      const currentScrollY = window.scrollY;
      
      // If scrolling DOWN and past 100px, hide ExploreMenu
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsExploreVisible(false);
      } 
      // If scrolling UP, show ExploreMenu
      else if (currentScrollY < lastScrollY) {
        setIsExploreVisible(true);
      } setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlExploreMenu, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', controlExploreMenu);
    };
  }, [lastScrollY]);
  return (
    <div className="flex flex-col min-h-screen">
      {showLogInPopUp && <LoginPopup />}
        <header className="sticky top-0 z-50 bg-white shadow-sm">
        {/* Main Navbar - Desktop */}
        <div className="hidden md:block">
          <Navbar />
        </div>

        {/* Main Navbar - Mobile */}
        <div className="md:hidden">
          <MobileNavbar />
        </div>
      </header>
       <div className={`
        sticky top-[64px] z-40 bg-yellow-50/30 border-y border-yellow-100
        transition-all duration-300 ease-out
        ${isExploreVisible 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-full opacity-0 pointer-events-none'
        }
      `}>
        <ExploreMenu />
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
          <Route path="/return-policy" element={<ReturnPolicy />} />
           <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </main>

      <Footer />
     
    </div>
  );
}

export default App;
