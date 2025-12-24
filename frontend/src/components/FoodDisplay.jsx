import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext.jsx";
import { assets } from "../assets/assets.js";
import { ToastContainer, toast } from "react-toastify";
import { TbCurrencyTaka } from "react-icons/tb";
import "react-toastify/dist/ReactToastify.css";
import { FoodDisplaySkelton } from "./FoodDisplaySkelton.jsx";
import { GiEmptyHourglass } from "react-icons/gi";
import { FaCheckCircle, FaTag } from "react-icons/fa";

export const FoodDisplay = () => {
  const navigate = useNavigate();
  const {
    food_list,
    cartItems,
    addToCart,
    deleteFromCart,
    isLoggedIn,
    fetchAllReview,
    setShowLogInPopUp,
    loadMore,
    hasMore,
    category
  } = useContext(StoreContext);

  const [reviewCount, setReviewCounts] = React.useState({});
  const [loadingMore, setLoadingMore] = useState(false);
  useEffect(() => {
    const handleScroll = async () => {
      if (loadingMore || !hasMore) return;

      // Check if the user scrolled near the bottom (300px from bottom)
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 300
      ) {
        setLoadingMore(true);
        await loadMore();
        setLoadingMore(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingMore, hasMore]);
  useEffect(() => {
    const loadAllReviewCounts = async () => {
      const counts = {};

      for (let item of food_list) {
        const count = await fetchAllReview(item._id);
        counts[item._id] = count;
      }

      setReviewCounts(counts);
    };

    if (food_list.length > 0) {
      loadAllReviewCounts();
    }
  }, [food_list]);

  const handleAddToCart = (foodItem) => {
    if (!isLoggedIn()) {
      toast.error("Please log in first");
      setShowLogInPopUp(true);
    } else {
     
      addToCart(foodItem._id);
    }
  };

  // Calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    if (!discount || discount <= 0) return price;
    return price - (price * discount) / 100;
  };

  if (!food_list || !food_list.length) {
    return <FoodDisplaySkelton />;
  }

  return (
    <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
          Today's Specials
        </h2>
        <p className="text-gray-600 text-lg text-center pb-5">
          Freshly prepared with love and served with passion
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {food_list
          .filter(
            (item) =>
              !category || category === "all" || category === item.category
          )
          .map((foodItem) => {
            const quantity = cartItems[foodItem._id] || 0;
            const isAvailable = foodItem.isAvailable !== false;
            const hasDiscount = Number(foodItem.discount) > 0;

            const originalPrice = parseFloat(foodItem.price);
            const discountPercentage = foodItem.discount || 0;
            const discountedPrice = hasDiscount
              ? calculateDiscountedPrice(originalPrice, discountPercentage)
              : originalPrice;

            return (
              <div
                key={foodItem._id}
                className={`
                  group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl 
                  border border-gray-100 transition-all duration-500 
                  transform hover:-translate-y-2 relative overflow-hidden
                  animate-fadeIn relative
                  ${!isAvailable ? "opacity-80" : ""}
                `}
              >
                {/* Discount Badge - Top Left Corner */}
                {hasDiscount && isAvailable && (
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                      <FaTag className="w-3 h-3" />
                      <span>{discountPercentage}% OFF</span>
                    </div>
                  </div>
                )}

                {/* Stock Status Badge - Top Right Corner */}
                <div
                  className={`
                    absolute top-4 right-4 z-20 px-3 py-1.5 rounded-full 
                    text-xs font-bold shadow-lg backdrop-blur-sm
                    ${
                      isAvailable
                        ? "bg-green-100 text-green-800 border border-green-300"
                        : "bg-red-100 text-red-800 border border-red-300"
                    }
                  `}
                >
                  <div className="flex items-center gap-1">
                    {isAvailable ? (
                      <>
                        <FaCheckCircle className="w-3 h-3" />
                        <span>In Stock</span>
                      </>
                    ) : (
                      <>
                        <GiEmptyHourglass className="w-3 h-3" />
                        <span>Out of Stock</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Image Container with Overlay for Out of Stock */}
                <div className="relative w-full h-60  rounded-xl overflow-hidden">
                  <Link to={`/item/${foodItem._id}`}>
                    <img
                      src={foodItem.imageUrl}
                      alt={foodItem.name}
                      className={`
                        w-full h-full object-cover transition-transform duration-700 
                        ${isAvailable ? "group-hover:scale-110" : "grayscale"}
                      `}
                    />

                    {/* Gradient Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent 
                        ${
                          isAvailable
                            ? "opacity-0 group-hover:opacity-100"
                            : "opacity-50"
                        } 
                        transition-opacity duration-300`}
                    />

                    {/* Out of Stock Overlay */}
                    {!isAvailable && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="text-center p-4">
                          <GiEmptyHourglass className="w-10 h-10 text-white mx-auto mb-2" />
                          <span className="text-white font-bold text-lg">
                            Out of Stock
                          </span>
                        </div>
                      </div>
                    )}
                  </Link>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center">
                      <h2
                        className={`
                          text-xl font-bold line-clamp-1
                          ${
                            isAvailable
                              ? "text-gray-900 group-hover:text-orange-600"
                              : "text-gray-500"
                          }
                          transition-colors
                        `}
                      >
                        {foodItem.name}
                      </h2>
                      <button
                        onClick={() => {
                          if (!isLoggedIn()) {
                            toast.error("Please log in first");
                            setShowLogInPopUp(true);
                          } else if (isAvailable) {
                            addToCart(foodItem._id);
                            navigate("/order");
                          } else {
                            toast.error("This item is out of stock");
                          }
                        }}
                        className={`
                          z-20 px-3 py-2 text-sm font-bold rounded-lg shadow-lg 
                          transition-all duration-200 hover:scale-105 active:scale-95
                          ${
                            isAvailable
                              ? hasDiscount
                                ? "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-xl"
                                : "bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:shadow-xl"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }
                        `}
                        disabled={!isAvailable}
                      >
                        {isAvailable ? "Buy" : "Unavailable"}
                      </button>
                    </div>

                    <p
                      className={`
                        text-sm mt-2 line-clamp-2 leading-relaxed
                        ${isAvailable ? "text-gray-600" : "text-gray-400"}
                      `}
                    >
                      {foodItem.description}
                    </p>
                  </div>

                  {/* Price and Rating */}
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        {/* Discounted Price */}
                        <div className="flex items-center">
                          <h3
                            className={`
                              text-2xl font-bold bg-clip-text text-transparent
                              ${
                                isAvailable
                                  ? hasDiscount
                                    ? "bg-gradient-to-r from-red-600 to-orange-600"
                                    : "bg-gradient-to-r from-orange-600 to-red-600"
                                  : "bg-gradient-to-r from-gray-400 to-gray-500"
                              }
                            `}
                          >
                            {discountedPrice.toFixed(2)}
                          </h3>
                          <TbCurrencyTaka
                            className={`
                              text-3xl font-bold
                              ${
                                isAvailable
                                  ? hasDiscount
                                    ? "text-red-600"
                                    : "text-orange-600"
                                  : "text-gray-400"
                              }
                            `}
                          />
                        </div>

                        {/* Original Price with strikethrough if discount exists */}
                        {hasDiscount && isAvailable && (
                          <div className="flex items-center">
                            <span className="text-lg text-gray-500 line-through mr-1">
                              {originalPrice.toFixed(2)}
                            </span>
                            <TbCurrencyTaka className="text-lg text-gray-500 line-through" />
                          </div>
                        )}
                      </div>

                      {/* You Save Amount */}
                      {hasDiscount && isAvailable && (
                        <div className="text-xs text-green-600 font-semibold mt-1">
                          Save{" "}
                          {((originalPrice * discountPercentage) / 100).toFixed(
                            2
                          )}
                          ৳
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <img
                        src={assets.rating_starts}
                        alt="rating"
                        className={`w-20 opacity-90 ${
                          !isAvailable ? "grayscale opacity-50" : ""
                        }`}
                      />
                      <span
                        className={`
                          text-xs font-medium
                          ${isAvailable ? "text-gray-500" : "text-gray-400"}
                        `}
                      >
                        ({reviewCount[foodItem._id]})
                      </span>
                      <span
                        className={`
                          text-xs font-medium
                          ${isAvailable ? "text-gray-500" : "text-gray-400"}
                        `}
                      >
                        reviews
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Section */}
                  <div className="mt-4">
                    {!isAvailable ? (
                      <div
                        className="
                          w-full bg-gradient-to-r from-gray-300 to-gray-400 
                          text-gray-600 font-semibold py-3 px-6 rounded-xl
                          flex items-center justify-center gap-2
                          cursor-not-allowed
                        "
                      >
                        <GiEmptyHourglass className="w-5 h-5" />
                        Currently Unavailable
                      </div>
                    ) : quantity === 0 ? (
                      <button
                        onClick={() => {
                          handleAddToCart(foodItem);
                        }}
                        className={`
                          w-full font-semibold py-3 px-6 rounded-xl
                          transition-all duration-300 transform hover:scale-105
                          shadow-lg flex items-center justify-center gap-2
                          ${
                            hasDiscount
                              ? "bg-gradient-to-r from-red-500 to-orange-500 text-white hover:shadow-red-500/25 hover:from-red-600 hover:to-orange-600"
                              : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-green-500/25 hover:from-green-600 hover:to-emerald-700"
                          }
                        `}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        {hasDiscount ? "Quick to Cart" : "Add to Cart"}
                      </button>
                    ) : (
                      <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3 border border-gray-200">
                        <button
                          onClick={() => deleteFromCart(foodItem._id)}
                          className="
                            w-10 h-10 bg-red-500 text-white rounded-lg 
                            hover:bg-red-600 transition-all duration-200
                            flex items-center justify-center font-bold text-lg
                            transform hover:scale-110 shadow-md
                          "
                        >
                          −
                        </button>

                        <div className="flex flex-col items-center">
                          <span className="text-lg font-bold text-gray-800">
                            {quantity}
                          </span>
                          <span className="text-xs text-gray-500">in cart</span>
                        </div>

                        <button
                          onClick={() => addToCart(foodItem._id)}
                          
                          className={`
                            w-10 h-10 rounded-lg text-white
                            transition-all duration-200
                            flex items-center justify-center font-bold text-lg
                            transform hover:scale-110 shadow-md
                            ${
                              hasDiscount
                                ? "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
                                : "bg-green-500 hover:bg-green-600"
                            }
                          `}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Glow Effect - Only for available items */}
                {isAvailable && (
                  <div
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 ${
                      hasDiscount
                        ? "bg-gradient-to-r from-red-500/10 to-orange-500/10"
                        : "bg-gradient-to-r from-orange-500/10 to-red-500/10"
                    }`}
                  />
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};
