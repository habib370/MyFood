import { useState, useContext, useEffect, useRef } from "react";
import { assets } from "../assets/assets.js";
import { Link } from "react-router-dom";
import { Logo } from "../components/Logo.jsx";
import { StoreContext } from "../context/StoreContext.jsx";
import { UserProfile } from "./UserProfile.jsx";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { FiSearch, FiX, FiArrowRight, FiClock } from "react-icons/fi";
import { TbTrendingUp } from "react-icons/tb";
import { IoPersonOutline } from "react-icons/io5";
import { TbCurrencyTaka } from "react-icons/tb";

export const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [categories, setCategories] = useState([]);

  const searchInputRef = useRef(null);
  const searchPopupRef = useRef(null);

  const { cartItems, isLoggedIn, showLogInPopUp, setShowLogInPopUp, url } =
    useContext(StoreContext);

  const totalCount = Object.values(cartItems).reduce(
    (sum, qty) => sum + qty,
    0
  );

  // Load recent searches from localStorage and fetch categories from backend
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
    
    // Fetch categories from backend
    fetchCategories();
  }, []);

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${url}/api/food/search`);
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories || data.data || []);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  // Save recent searches to localStorage
  const saveToRecentSearches = (query) => {
    if (!query.trim()) return;

    // Only save if we got actual results
    if (searchResults.length > 0) {
      const updatedSearches = [
        query,
        ...recentSearches.filter(
          (item) => item.toLowerCase() !== query.toLowerCase()
        ),
      ].slice(0, 5); // Keep only 5 most recent

      setRecentSearches(updatedSearches);
      localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    }
  };

  // Search function
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `${url}/api/food/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSearchResults(data);

      // Save to recent searches only if we got results
      if (data.length > 0) {
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
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  // Calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    if (!discount || discount <= 0) return price;
    return price - (price * discount) / 100;
  };

  return (
    <>
      <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row with Logo, Search, and User Actions */}
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/"  onClick={() => window.scrollTo(0, 0)} className="flex-shrink-0">
              <Logo />
            </Link>

            {/* Search Bar - Always Visible but can expand */}
            <div className="flex-1 max-w-xl mx-4 relative">
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <FiSearch className="text-gray-400 w-5 h-5" />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSearch(true)}
                  placeholder="Search for food items..."
                  className="w-full pl-12 pr-12 py-2.5 text-sm border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-all hover:border-gray-300"
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
            </div>

            {/* Desktop Right - Cart & User */}
            <div className="flex items-center gap-x-4">
              {/* Cart */}
              <Link
                to="/cart"
                 onClick={() => window.scrollTo(0, 0)}
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
                <div className="flex items-center gap-x-3">
                  <IoPersonOutline className="text-gray-600 text-xl" />
                  <button
                    onClick={() => setShowLogInPopUp(true)}
                    className="cursor-pointer border border-gray-300 hover:border-orange-500 hover:bg-orange-50 text-gray-700 hover:text-orange-700 font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    Register/Login
                  </button>
                </div>
              )}
            </div>
          </div>

         
         
        </div>

        {/* Search Results Dropdown */}
        {showSearch && (
          <div
            ref={searchPopupRef}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-gray-200 max-h-[70vh] overflow-y-auto animate-slideDown z-50"
          >
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {/* Search Results */}
              {searchQuery ? (
                <div>
                  {/* Loading */}
                  {isSearching && (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                    </div>
                  )}

                  {/* Results */}
                  {!isSearching && searchResults.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Search Results: {searchResults.length} items found
                      </h3>
                      
                      {/* Display results in grid layout */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {searchResults.map((item) => {
                          const hasDiscount = Number(item.discount) > 0;
                          const discountedPrice = hasDiscount 
                            ? calculateDiscountedPrice(item.price, item.discount)
                            : item.price;

                          return (
                            <Link
                              key={item._id}
                              to={`/item/${item._id}`}
                              className="group bg-white rounded-lg border border-gray-200 p-4 hover:border-orange-300 hover:shadow-md transition-all duration-300"
                              onClick={() => setShowSearch(false)}
                            >
                              <div className="flex flex-col h-full">
                                <div className="relative w-full h-40 mb-3 rounded-lg overflow-hidden">
                                  <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                  {hasDiscount && (
                                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                      {item.discount}% OFF
                                    </div>
                                  )}
                                </div>
                                
                                <h4 className="font-semibold text-gray-800 group-hover:text-orange-600 line-clamp-1 mb-1">
                                  {item.name}
                                </h4>
                                
                                <p className="text-sm text-gray-500 mb-2 line-clamp-2 flex-1">
                                  {item.description}
                                </p>
                                
                                <div className="flex justify-between items-center mt-2">
                                  <div className="flex items-center">
                                    <span className="font-bold text-lg text-gray-900">
                                      {discountedPrice.toFixed(2)}
                                    </span>
                                    <TbCurrencyTaka className="text-xl font-bold text-orange-600 ml-0.5" />
                                    {hasDiscount && (
                                      <span className="ml-2 text-sm text-gray-500 line-through flex items-center">
                                        {item.price.toFixed(2)}
                                        <TbCurrencyTaka className="text-sm ml-0.5" />
                                      </span>
                                    )}
                                  </div>
                                  <FiArrowRight className="text-gray-400 group-hover:text-orange-500" />
                                </div>
                                
                                <div className="mt-2 text-xs text-gray-400">
                                  <span className="px-2 py-1 bg-gray-100 rounded">
                                    {item.category}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* No Results */}
                  {!isSearching &&
                    searchResults.length === 0 &&
                    searchQuery && (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🍽️</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                          No items found
                        </h3>
                        <p className="text-gray-500 mb-6">
                          Try searching with different keywords
                        </p>
                      </div>
                    )}
                </div>
              ) : (
                /* Recent & Popular Searches */
                <div className="space-y-6">
                  {/* Recent Searches - Only show if we have recent searches */}
                  {recentSearches.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <FiClock className="mr-2 text-gray-500" />
                        Recent Searches
                      </h3>
                      <div className="space-y-2">
                        {recentSearches.map((term, index) => (
                          <button
                            key={index}
                            onClick={() => handlePopularSearch(term)}
                            className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                          >
                            <div className="flex items-center">
                              <FiSearch className="w-4 h-4 mr-3 text-gray-400" />
                              <span className="text-gray-700 group-hover:text-orange-600">
                                {term}
                              </span>
                            </div>
                            <FiArrowRight className="text-gray-300 group-hover:text-orange-500" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Categories - Show categories from backend */}
                  {categories.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <TbTrendingUp className="mr-2 text-orange-500" />
                        Browse Categories
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {categories.map((category, index) => (
                          <button
                            key={index}
                            onClick={() => handlePopularSearch(category)}
                            className="px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 text-orange-700 border border-orange-200 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-sm text-center font-medium"
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Add CSS Animation */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </>
  );
};