import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext.jsx";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { assets } from "../assets/assets";
import {Logo} from './Logo.jsx'
import {UserProfile} from './UserProfile.jsx'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useNavigate}from 'react-router-dom'
export const MobileNavbar = ({ setShow }) => {
  const navigate=useNavigate();
  const [open, setOpen] = useState(false);
  const { cartItems, isLoggedIn, user, setToken, setUser } =
    useContext(StoreContext);

  const totalCount = Object.values(cartItems).reduce(
    (sum, qty) => sum + qty,
    0
  );

  const menuItems = ["home", "menu", "mobile-app", "contact us"];

  const handleLogout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setOpen(false);
  };

  return (
    <div className="md:hidden">

      {/* Top bar */}
      <div className="flex justify-between items-center px-4 py-3 border-b bg-white shadow-sm">

        {/* Left menu button */}
        <button onClick={() => setOpen(true)}>
          <MenuIcon className="w-7 h-7 text-gray-800" />
        </button>

        {/* App Logo text only (optional, you can replace with <Logo />) */}
       <div className="flex items-center  gap-2 pr-20">
        <button onClick={()=>{navigate('/')}}>< Logo/></button>
      
       </div>

        {/* Cart */}
       <div className="flex gap-x-2 items-center">
         <Link to="/cart" className="relative p-2">
         <ShoppingCartIcon className="text-gray-600" />
          {totalCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              {totalCount > 9 ? "9+" : totalCount}
            </span>
          )}
        </Link>
       {!isLoggedIn()? ( <button
              onClick={() => {
                setShow(true);
                setOpen(false);
              }}
              className=" bg-gradient-to-r from-orange-500 to-red-500 text-white py-1 px-2 rounded-sm font-semibold mt-4"
            >
              Register
            </button>):(<UserProfile/>) }
       </div>
      </div>

      {/* Slide Drawer */}
      <div
        className={`fixed top-0 left-0 h-2/5 w-3/7  bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 pt-1 translate-x-2 rounded-full hover:bg-gray-100"
        >
          <CloseIcon className="w-6 h-6 text-gray-800" />
        </button>

        {/* User Info */}
        <div className="pt-4 pl-2">
       
           < Logo />
       
        </div>

        

        {/* Menu List */}
        <div className="px-5 space-y-3">
          {menuItems.map((item) => (
            <Link
              to={`/${item === "home" ? "" : item}`}
              key={item}
              onClick={() => setOpen(false)}
              className="block capitalize py-2 px-3 rounded-lg text-gray-700 font-medium hover:bg-gray-100"
            >
              {item}
            </Link>
          ))}

         
          
        </div>
      </div>

      {/* Click-away overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0  bg-opacity-30 backdrop-blur-xs"
        ></div>
      )}
    </div>
  );
};
