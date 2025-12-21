import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext.jsx";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { assets } from "../assets/assets";
import { Logo } from './Logo.jsx'
import { UserProfile } from './UserProfile.jsx'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiX, FiArrowRight, FiClock } from "react-icons/fi";
import { TbTrendingUp } from "react-icons/tb";

export const MobileNavbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [popularSearches, setPopularSearches] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  
  const searchInputRef = useRef(null);
  const { cartItems, isLoggedIn, user, setToken, setUser, showLogInPopUp, setShowLogInPopUp ,url} =
    useContext(StoreContext);

  const totalCount = Object.values(cartItems).reduce(
    (sum, qty) => sum + qty,
    0
  );

  const menuItems = ["home", "menu", "mobile-app", "contact us"];

  // Popular searches data
  const defaultPopularSearches = [
    "Chicken", "Rice", "Milk", "Eggs", "Bread",
    "Potato", "Tomato", "Onion", "Fish", "Apple"
  ];

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
    setPopularSearches(defaultPopularSearches);
  }, []);

  // Save recent searches to localStorage
  const saveToRecentSearches = (query) => {
    if (!query.trim()) return;
    
    const updatedSearches = [
      query,
      ...recentSearches.filter(item => item.toLowerCase() !== query.toLowerCase())
    ].slice(0, 5);
    
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  // Search function
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`${url}/api/food/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setSearchResults(data || []);
      
      if (data && data.length > 0) {
        saveToRecentSearches(query);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search effect
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Focus input when search opens
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  // Close on ESC key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && showSearch) {
        setShowSearch(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [showSearch]);

  const handleLogout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setOpen(false);
  };

  // Handle popular search click
  const handlePopularSearch = (term) => {
    setSearchQuery(term);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <>
      <div className="md:hidden">
        {/* Top bar */}
        <div className="flex justify-between items-center px-4 py-3 border-b bg-white shadow-sm">
          {/* Left menu button */}
          <button onClick={() => setOpen(true)}>
            <MenuIcon className="w-7 h-7 text-gray-800" />
          </button>

          {/* App Logo */}
          <div className="flex items-center gap-2 pr-20">
            <button onClick={() => { navigate('/') }}>
              <Logo />
            </button>
          </div>

          {/* Right side icons */}
          <div className="flex gap-x-3 items-center">
            {/* Search Button */}
            <button
              onClick={() => setShowSearch(true)}
              className="p-1"
              aria-label="Search"
            >
              <FiSearch className="text-gray-600 w-6 h-6" />
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative p-1">
              <ShoppingCartIcon className="text-gray-600" />
              {totalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  {totalCount > 9 ? "9+" : totalCount}
                </span>
              )}
            </Link>
            
            {!isLoggedIn() ? (
              <button
                onClick={() => {
                  setShowLogInPopUp(true);
                  setOpen(false);
                }}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-1 px-2 rounded-sm font-semibold"
              >
                Register
              </button>
            ) : (
              <UserProfile />
            )}
          </div>
        </div>

        {/* Slide Drawer */}
        <div
          className={`fixed top-0 left-0 h-2/5 w-3/7 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
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
            <Logo />
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
            className="fixed inset-0 bg-opacity-30 backdrop-blur-xs"
          ></div>
        )}
      </div>

      {/* Mobile Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSearch(false)}
          />

          {/* Search Panel - Full screen on mobile */}
          <div className="fixed top-0 left-0 right-0 bottom-0 bg-white">
            {/* Search Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b">
              <div className="flex-1 relative">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search food..."
                    className="w-full pl-10 pr-10 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  />
                  {searchQuery && (
                    <button
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      <FiX className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
              <button
                onClick={() => setShowSearch(false)}
                className="ml-2 text-gray-600 font-medium"
              >
                Cancel
              </button>
            </div>

            {/* Search Content */}
            <div className="h-[calc(100vh-80px)] overflow-y-auto p-4">
              {searchQuery ? (
                <>
                  {/* Loading */}
                  {isSearching && (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                    </div>
                  )}

                  {/* Results */}
                  {!isSearching && Array.isArray(searchResults) && searchResults.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Results ({searchResults.length})
                      </h3>
                      {searchResults.map((item) => (
                        <Link
                          key={item._id}
                          to={`/item/${item._id}`}
                          className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100"
                          onClick={() => setShowSearch(false)}
                        >
                          <img
                            src={item.imageUrl || assets.placeholder_food}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg mr-3"
                            onError={(e) => {
                              e.target.src = assets.placeholder_food;
                            }}
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {item.category}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-800">
                              ₹{item.price}
                            </div>
                          </div>
                          <FiArrowRight className="ml-2 text-gray-400" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* No Results */}
                  {!isSearching && (!Array.isArray(searchResults) || searchResults.length === 0) && searchQuery && (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-3">🔍</div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        No items found
                      </h3>
                      <p className="text-gray-500">
                        Try different keywords
                      </p>
                    </div>
                  )}
                </>
              ) : (
                /* Recent & Popular Searches */
                <div className="space-y-6">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <FiClock className="mr-2" />
                        Recent
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((term, index) => (
                          <button
                            key={index}
                            onClick={() => handlePopularSearch(term)}
                            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors flex items-center"
                          >
                            <FiSearch className="w-4 h-4 mr-2" />
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Searches */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                      <TbTrendingUp className="mr-2" />
                      Popular
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((term, index) => (
                        <button
                          key={index}
                          onClick={() => handlePopularSearch(term)}
                          className="px-3 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded-lg transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quick Categories */}
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Categories
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {["Fruits", "Vegetables", "Meat", "Dairy", "Bakery", "Beverages"].map((category) => (
                        <button
                          key={category}
                          onClick={() => handlePopularSearch(category)}
                          className="p-3 bg-white border border-gray-200 hover:border-orange-300 hover:bg-orange-50 rounded-lg transition-all text-center"
                        >
                          <span className="font-medium text-gray-700">
                            {category}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};