import { useState, useContext, useEffect, useRef } from "react";
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";
import { Logo } from "../components/Logo.jsx";
import { StoreContext } from "../context/StoreContext.jsx";
import { UserProfile } from "./UserProfile.jsx";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { FiSearch, FiX, FiArrowRight, FiClock } from "react-icons/fi";
import { TbTrendingUp } from "react-icons/tb";

export const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [popularSearches, setPopularSearches] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  
  const searchInputRef = useRef(null);
  const searchPopupRef = useRef(null);
  
  const { cartItems, isLoggedIn, showLogInPopUp, setShowLogInPopUp,url } = useContext(StoreContext);

  const totalCount = Object.values(cartItems).reduce(
    (sum, qty) => sum + qty,
    0
  );
  
  const menuItems = ["home", "help", "contact", "about us"];

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
    ].slice(0, 5); // Keep only 5 most recent
    
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
      const data = await response.json();
      setSearchResults(data);
      
      // Save to recent searches
      saveToRecentSearches(query);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Focus input when search opens
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showSearch &&
        searchPopupRef.current &&
        !searchPopupRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="Search"]')
      ) {
        setShowSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
      <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          
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
            {/* Search Button */}
            <button 
              onClick={() => setShowSearch(true)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Search"
            >
              <FiSearch className="text-gray-600 w-5 h-5" />
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

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowSearch(false)}
          />
          
          {/* Search Panel */}
          <div 
            ref={searchPopupRef}
            className="fixed top-0 left-0 right-0 bg-white shadow-xl animate-slideDown"
          >
            <div className="max-w-3xl mx-auto px-4 py-6">
              {/* Search Input */}
              <div className="relative mb-6">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <FiSearch className="text-gray-400 w-5 h-5" />
                </div>
                
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for food items..."
                  className="w-full pl-12 pr-12 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-all"
                />
                
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Search Results */}
              {searchQuery ? (
                <div className="max-h-[60vh] overflow-y-auto">
                  {/* Loading */}
                  {isSearching && (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                    </div>
                  )}

                  {/* Results */}
                  {!isSearching && searchResults.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Search Results: {searchResults.length}
                      </h3>
                      {searchResults.map((item) => (
                        <Link
                          key={item._id}
                          to={`/item/${item._id}`}
                          className="flex items-center p-4 hover:bg-gray-50 rounded-lg transition-colors group"
                          onClick={() => setShowSearch(false)}
                        >
                          <img 
                            src={item.imageUrl} 
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded-lg mr-4"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800 group-hover:text-orange-600">
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
                            <div className="text-xs text-gray-400">
                              per {item.unit || "item"}
                            </div>
                          </div>
                          <FiArrowRight className="ml-4 text-gray-400 group-hover:text-orange-500" />
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* No Results */}
                  {!isSearching && searchResults.length === 0 && searchQuery && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-3">🍽️</div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        No items found
                      </h3>
                      <p className="text-gray-500">
                        Try searching with different keywords
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* Recent & Popular Searches */
                <div className="space-y-6">
                  {/* Recent Searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                        <FiClock className="mr-2" />
                        Recent Searches
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {recentSearches.map((term, index) => (
                          <button
                            key={index}
                            onClick={() => handlePopularSearch(term)}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors flex items-center"
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
                      Popular Searches
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((term, index) => (
                        <button
                          key={index}
                          onClick={() => handlePopularSearch(term)}
                          className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded-full transition-colors"
                        >
                          {term}
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

      {/* Add CSS Animation */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </>
  );
};