import React, { useContext, useState, useRef, useEffect } from "react";
import { StoreContext } from "../context/StoreContext.jsx";
import LogoutIcon from '@mui/icons-material/Logout';
export const UserProfile = () => {
  const { user, setToken, setUser } = useContext(StoreContext);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        className="h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {firstLetter}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-md z-50">
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-sm font-semibold">{user?.firstName}</p>
            <p className="text-xs text-gray-500">Welcome!</p>
          </div>
         <button
  onClick={handleLogout}
  className="w-full px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-orange-500 hover:text-white rounded-lg"
>
  <div className="flex items-center gap-2 justify-center">
    <LogoutIcon style={{ fontSize: 15 }} />
    <span>Logout</span>
  </div>
</button>

        </div>
      )}
    </div>
  );
};
