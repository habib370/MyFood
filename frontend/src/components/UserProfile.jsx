import React, { useContext, useState, useRef, useEffect } from "react";
import { StoreContext } from "../context/StoreContext.jsx";
import LogoutIcon from '@mui/icons-material/Logout';
import {Link,useNavigate} from 'react-router-dom'  
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
export const UserProfile = () => {
  const navigate=useNavigate()
  const { user, setToken, setUser } = useContext(StoreContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle dropdown animation
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleLogout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsOpen(false);
  };

  const firstLetter = user?.firstName?.charAt(0).toUpperCase() || "U";

  return (
    <div className="relative" ref={ref}>
      {/* Avatar */}
      <div
      className="flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className="text-sm font-semibold">{user?.firstName}</p>
       {!isOpen? <ExpandMoreIcon/>:<KeyboardArrowUpIcon/>}
      </div>

      {/* Dropdown */}
      {(isOpen || isAnimating) && (
        <div className={`
          absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-2xl z-50
          transition-all duration-300 ease-out transform origin-top-right
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2'}
        `}>
          {/* User header */}
          <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100 rounded-t-xl">
            <p className="text-sm font-bold text-gray-800 truncate">{user?.firstName}</p>
            <p className="text-xs text-gray-500 mt-1">Welcome back! 👋</p>
          </div>

          {/* Menu items */}
          <div className="py-2">
            <Link to="/my-orders" className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 flex items-center gap-3">
              <span className="text-base">🍽️</span>
              <span>My Orders</span>
            </Link>

            <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 flex items-center gap-3">
              <span className="text-base">🛒</span>
              <button onClick={()=>navigate('/delivery')}>Track Order</button>
            </button>

            <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 flex items-center gap-3">
              <span className="text-base">👤</span>
            <Link to={'/profile'}>Profile</Link>
            </button>

            <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 flex items-center gap-3">
              <span className="text-base">⚙️</span>
              <span>Settings</span>
            </button>

            {/* Divider */}
            <div className="border-t border-gray-100 my-1"></div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 rounded-b-xl"
            >
              <LogoutIcon style={{ fontSize: 18 }} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
