import { useState, useContext } from "react";
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";
import { Logo } from "../components/Logo.jsx";
import { StoreContext } from "../context/StoreContext.jsx";
import { UserProfile } from "./UserProfile.jsx";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

export const Navbar = ({ setShow }) => {
  const [menu, setMenu] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems, isLoggedIn, user, setToken, setUser } =
    useContext(StoreContext);
  const handleLogout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsOpen(false);
  };

  const totalCount = Object.values(cartItems).reduce(
    (sum, qty) => sum + qty,
    0
  );
  const [menuIconCurrState, setMenuIconCurrState] = useState("menu");
  const menuItems = ["home", "menu", "mobile-app", "contact us"];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
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
            <img className="w-5 h-5" src={assets.basket_icon} alt="basket" />
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
              onClick={() => setShow(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 shadow-lg"
            >
              Register
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <img className="w-5 h-5" src={assets.search_icon} alt="search" />
          </button>
          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <img className="w-5 h-5" src={assets.basket_icon} alt="cart" />
            {totalCount > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                {totalCount > 9 ? "9+" : totalCount}
              </div>
            )}
          </Link>
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <MenuIcon className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
{isMobileMenuOpen && (
  <div
    className={`md:hidden fixed top-0 right-0 h-4/7 w-1/2 bg-white shadow-xl border-l border-gray-200 z-50 transform transition-transform duration-300 ${
      isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
    }`}
  >
    {/* Close button (fixed at top-right ALWAYS) */}
    <button
      onClick={() => setIsMobileMenuOpen(false)}
      className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 z-50"
    >
      <CloseIcon className="w-6 h-6 text-gray-800" />
    </button>

    {/* User Section */}
    <div className="flex flex-col items-center text-center mt-10 mb-4 px-4">
     {isLoggedIn() && user ? (
  <>
    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-bold shadow-md">
      {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
      {user?.lastName?.charAt(0)?.toUpperCase() || ""}
    </div>

    <p className="mt-2 font-semibold text-gray-800">
      {user?.firstName || ""} {user?.lastName || ""}
    </p>
    <p className="text-xs text-gray-500">{user?.email || ""}</p>
  </>
) : (
  <>
    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-lg font-bold shadow-md">
      ?
    </div>
    <p className="mt-2 text-sm text-gray-500">Guest User</p>
  </>
)}

    </div>

    <hr className="border-gray-200" />

    {/* Menu Items */}
    <div className="px-4 py-3 space-y-2">
      {menuItems.map((item) => (
        <div
          key={item}
          onClick={() => {
            setMenu(item);
            setIsMobileMenuOpen(false);
          }}
          className={`px-3 py-2 rounded-lg font-medium capitalize transition-all cursor-pointer ${
            menu === item
              ? "bg-orange-100 text-orange-600 border-l-4 border-orange-500"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          {item}
        </div>
      ))}

      {/* Register / Logout */}
      {!isLoggedIn() ? (
        <button
          onClick={() => {
            setShow(true);
            setIsMobileMenuOpen(false);
          }}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-xl font-semibold mt-2"
        >
          Register
        </button>
      ) : (
        <button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-xl font-semibold mt-2"
        >
          Logout
        </button>
      )}
    </div>
  </div>
)}

    </nav>
  );
};
