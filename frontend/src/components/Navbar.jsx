import { useState, useContext } from "react";
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";
import { Logo } from "../components/Logo.jsx";
import { StoreContext } from "../context/StoreContext.jsx";
import { UserProfile } from "./UserProfile.jsx";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const Navbar = () => {
const [menu, setMenu] = useState("home");
const { cartItems, isLoggedIn , showLogInPopUp, setShowLogInPopUp} = useContext(StoreContext);

const totalCount = Object.values(cartItems).reduce(
(sum, qty) => sum + qty,
0
);
const menuItems = ["home", "help", "contact", "about us"];

return ( <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50"> <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">

    {/* Logo */}  
    <Link to="/" className="flex-shrink-0">  
      <Logo />  
    </Link>  

    {/* Desktop Menu */}  
    <div className="hidden md:flex items-center gap-x-10">  
      {menuItems.map((item) => (  
        <div  
          key={item}  
          onClick={() => setMenu(item)}  
          className="relative cursor-pointer group"  
        >  
          <span  
            className={`font-medium capitalize transition-all duration-300 ${  
              menu === item  
                ? "text-orange-600 font-semibold"  
                : "text-gray-700 hover:text-orange-500"  
            }`}  
          >  
            {item}  
          </span>  
          <span  
            className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 ease-in-out ${  
              menu === item ? "w-full" : "w-0 group-hover:w-full"  
            }`}  
          ></span>  
        </div>  
      ))}  
    </div>  

    {/* Desktop Right */}  
    <div className="hidden md:flex items-center gap-x-6">  
      {/* Search */}  
      <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">  
        <img className="w-5 h-5" src={assets.search_icon} alt="search" />  
      </button>  

      {/* Cart */}  
      <Link  
        to="/cart"  
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"  
      >  
        <ShoppingCartIcon className="text-gray-600" />  
        {totalCount > 0 && (  
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center text-xs text-white font-semibold shadow-sm">  
            {totalCount > 9 ? "9+" : totalCount}  
          </div>  
        )}  
      </Link>  

      {/* User / Sign In */}  
      {isLoggedIn() ? (  
        <UserProfile />  
      ) : (  
        <button  
          onClick={() => setShowLogInPopUp(true)}  
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-lg"  
        >  
          Register  
        </button>  
      )}  
    </div>  

  </div>  
</nav>  


);
};
