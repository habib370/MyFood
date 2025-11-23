import { useState } from "react";
import { assets } from "../assets/assets.js";
import { Link } from 'react-router-dom';

export const Navbar = ({ setShow }) => {
  const [menu, setMenu] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = ["home", "menu", "mobile-app", "contact us"];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to='/' className="flex-shrink-0">
            <img 
              className="w-32 md:w-40 transition-transform hover:scale-105 duration-300" 
              src={assets.logo} 
              alt="logo" 
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-x-10">
            {menuItems.map((item) => (
              <div
                key={item}
                onClick={() => setMenu(item)}
                className="relative cursor-pointer group"
              >
                <span className={`font-medium capitalize transition-all duration-300 ${
                  menu === item 
                    ? "text-orange-600 font-semibold" 
                    : "text-gray-700 hover:text-orange-500"
                }`}>
                  {item}
                </span>
                {/* Animated underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300 ease-in-out ${
                    menu === item ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </div>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-x-6">
            {/* Search Icon */}
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group">
              <img 
                className="w-5 h-5 group-hover:scale-110 transition-transform" 
                src={assets.search_icon} 
                alt="search" 
              />
            </button>

            {/* Cart Icon */}
            <Link 
              to='/cart' 
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
            >
              <img 
                className="w-5 h-5 group-hover:scale-110 transition-transform" 
                src={assets.basket_icon} 
                alt="basket" 
              />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-white text-xs font-bold">3</span>
              </div>
            </Link>

            {/* Sign In Button */}
            <button
              onClick={() => setShow(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/25"
            >
              Sign In
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            {/* Mobile Icons */}
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <img className="w-5 h-5" src={assets.search_icon} alt="Search" />
            </button>
            
            <Link to='/cart' className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
              <img className="w-5 h-5" src={assets.basket_icon} alt="Cart" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">3</span>
              </div>
            </Link>

            {/* Hamburger Menu */}
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
                <div className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}></div>
                <div className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}></div>
                <div className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-xl transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-4 py-6 space-y-4">
            {menuItems.map((item) => (
              <div
                key={item}
                onClick={() => {
                  setMenu(item);
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between p-3 rounded-xl font-medium capitalize transition-all duration-200 ${
                  menu === item
                    ? 'bg-orange-50 text-orange-600 border-l-4 border-orange-500'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-orange-600'
                }`}
              >
                <span>{item}</span>
                {menu === item && (
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                )}
              </div>
            ))}
            
            {/* Mobile Sign In Button */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setShow(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};