import React, { useContext, useEffect } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { StoreContext } from "../context/StoreContext.jsx";
import { assets } from "../assets/assets.js";
import { ToastContainer, toast } from "react-toastify";
import { TbCurrencyTaka } from "react-icons/tb";
import "react-toastify/dist/ReactToastify.css";
import { FoodDisplaySkelton } from "./FoodDisplaySkelton.jsx";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export const FoodDisplay = ({ category }) => {
  const navigate=useNavigate()
  const {
    food_list,
    cartItems,
    addToCart,
    deleteFromCart,
    isLoggedIn,
    url,
    fetchAllReview,
    showLogInPopUp,
    setShowLogInPopUp,
  } = useContext(StoreContext);
  const [reviewCount, setReviewCounts] = React.useState({});
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
        <p className="text-gray-600 text-lg text-center pb-5 ">
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

            return (
              <div
                key={foodItem._id}
                className="
                  group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl 
                  border border-gray-100 transition-all duration-500 
                  transform hover:-translate-y-2 relative overflow-hidden
                  animate-fadeIn
                "
              >
                {/* Image Container */}
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden">
                  <Link to={`/item/${foodItem._id}`}>
                    <img
                      src={foodItem.imageUrl}
                      alt={foodItem.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-1">
                        {foodItem.name}
                      </h2>
                      <button
                      
                        onClick={() => {
                          if (!isLoggedIn()) {
                            toast.error("Please log in first");
                            setShowLogInPopUp(true);
                          } else {
                            addToCart(foodItem._id);
                            navigate("/order");
                          }
                        }}
                        className="z-20 px-3 py-2 bg-gradient-to-r from-yellow-500 to-orange-600  text-white  text-sm font-bold  rounded-lg shadow-lg hover:shadow-xl transition-all duration-200  hover:scale-105 active:scale-95"
                      >
                        Buy
                      </button>
                    </div>

                    <p className="text-gray-600 text-sm mt-2 line-clamp-2 leading-relaxed">
                      {foodItem.description}
                    </p>
                  </div>

                  {/* Price and Rating */}
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                     <div className="flex items-center">
                       <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        {foodItem.price}
                      </h3>
                      <TbCurrencyTaka className="text-orange-600 text-3xl font-bold"/>
                     </div>
                      
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={assets.rating_starts}
                        alt="rating"
                        className="w-20 opacity-90"
                      />
                      <span className="text-xs text-gray-500 font-medium">
                        ({reviewCount[foodItem._id]})
                      </span>
                      <span className="text-xs text-gray-500 font-medium">
                        reviews
                      </span>
                    </div>
                  </div>

                  {/* Add to Cart Section */}
                  <div className="mt-4">
                    {quantity === 0 ? (
                      <button
                        onClick={() => {
                          handleAddToCart(foodItem);
                        }}
                        className="
                          w-full bg-gradient-to-r from-green-500 to-emerald-600 
                          text-white font-semibold py-3 px-6 rounded-xl
                          hover:from-green-600 hover:to-emerald-700 
                          transition-all duration-300 transform hover:scale-105
                          shadow-lg hover:shadow-green-500/25
                          flex items-center justify-center gap-2
                        "
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
                        Add to Cart
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
                          className="
                            w-10 h-10 bg-green-500 text-white rounded-lg 
                            hover:bg-green-600 transition-all duration-200
                            flex items-center justify-center font-bold text-lg
                            transform hover:scale-110 shadow-md
                          "
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </div>
            );
          })}
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
